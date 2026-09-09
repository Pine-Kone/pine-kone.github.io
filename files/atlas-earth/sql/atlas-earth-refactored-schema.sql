
/* Refactored Atlas Earth Database Schema
   Generated from review of original script.
*/

DROP TABLE IF EXISTS PurchasedPassports;
DROP TABLE IF EXISTS PurchasedPlots;
DROP TABLE IF EXISTS PassportTiers;
DROP TABLE IF EXISTS AdMultiplierTiers;
DROP TABLE IF EXISTS AdMultiplierSchedules;
DROP TABLE IF EXISTS PassportBoostTiers;
DROP TABLE IF EXISTS PassportBoostSchedules;
DROP TABLE IF EXISTS PlotTypeRates;
DROP TABLE IF EXISTS PlotTypes;
DROP TABLE IF EXISTS Cities;
DROP TABLE IF EXISTS States;
DROP TABLE IF EXISTS Countries;

CREATE TABLE Countries (
    countryID INT IDENTITY(1,1) PRIMARY KEY,
    countryCode CHAR(3) NOT NULL UNIQUE,
    countryName VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE States (
    stateID INT IDENTITY(1,1) PRIMARY KEY,
    countryID INT NOT NULL,
    abbreviation CHAR(2) NOT NULL UNIQUE,
    stateName VARCHAR(50) NOT NULL UNIQUE,
    FOREIGN KEY (countryID) REFERENCES Countries(countryID)
);

CREATE TABLE Cities (
    cityID INT IDENTITY(1,1) PRIMARY KEY,
    cityName VARCHAR(255) NOT NULL,
    stateID INT NULL,
    countryID INT NOT NULL,
    FOREIGN KEY (stateID) REFERENCES States(stateID),
    FOREIGN KEY (countryID) REFERENCES Countries(countryID),
    CONSTRAINT UQ_City_State UNIQUE(cityName, stateID)
);

CREATE TABLE PlotTypes (
    plotTypeID INT IDENTITY(1,1) PRIMARY KEY,
    plotTypeName VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE PlotTypeRates (
    plotRateID INT IDENTITY(1,1) PRIMARY KEY,
    plotTypeID INT NOT NULL,
    effectiveDate DATE NOT NULL,
    expirationDate DATE NULL,
    spawnPercent DECIMAL(6,4) NOT NULL,
    earningPerSecond DECIMAL(18,11) NOT NULL,
    FOREIGN KEY (plotTypeID) REFERENCES PlotTypes(plotTypeID)
);

CREATE TABLE PassportBoostSchedules (
    scheduleID INT IDENTITY(1,1) PRIMARY KEY,
    effectiveDate DATE NOT NULL,
    expirationDate DATE NULL
);

CREATE TABLE PassportBoostTiers (
    tierID INT IDENTITY(1,1) PRIMARY KEY,
    scheduleID INT NOT NULL,
    minBadges INT NOT NULL,
    maxBadges INT NOT NULL,
    boostRate DECIMAL(5,2) NOT NULL,
    FOREIGN KEY (scheduleID) REFERENCES PassportBoostSchedules(scheduleID)
);

CREATE TABLE AdMultiplierSchedules (
    scheduleID INT IDENTITY(1,1) PRIMARY KEY,
    effectiveDate DATE NOT NULL,
    expirationDate DATE NULL
);

CREATE TABLE AdMultiplierTiers (
    tierID INT IDENTITY(1,1) PRIMARY KEY,
    scheduleID INT NOT NULL,
    minPlots INT NOT NULL,
    maxPlots INT NULL,
    multiplierAmount INT NOT NULL,
    FOREIGN KEY (scheduleID) REFERENCES AdMultiplierSchedules(scheduleID)
);

CREATE TABLE PassportTiers (
    passportTierID INT IDENTITY(1,1) PRIMARY KEY,
    passportTierName VARCHAR(20) NOT NULL
);

CREATE TABLE PurchasedPlots (
    plotNumber INT IDENTITY(1,1) PRIMARY KEY,
    purchaseDate DATE NOT NULL,
    plotTypeID INT NOT NULL,
    cityID INT NULL,
    stateID INT NULL,
    countryID INT NOT NULL,
    plotNotes VARCHAR(255) NULL,
    FOREIGN KEY (plotTypeID) REFERENCES PlotTypes(plotTypeID),
    FOREIGN KEY (cityID) REFERENCES Cities(cityID),
    FOREIGN KEY (stateID) REFERENCES States(stateID),
    FOREIGN KEY (countryID) REFERENCES Countries(countryID)
);
