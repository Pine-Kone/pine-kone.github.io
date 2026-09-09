/*
Atlas Earth Refactor Draft

This file contains the proposed normalized schema discussed:
Countries -> States -> Cities
Versioned PlotTypeRates
Versioned PassportBoost schedules
Versioned AdMultiplier schedules

The original data script follows below and can be migrated into
the new schema.
*/

CREATE TABLE Countries (
    countryID INT IDENTITY(1,1) PRIMARY KEY,
    countryCode CHAR(3) NOT NULL UNIQUE,
    countryName VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE States (
    stateID INT IDENTITY(1,1) PRIMARY KEY,
    countryID INT NOT NULL,
    abbreviation CHAR(2) NOT NULL UNIQUE,
    stateName VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE Cities (
    cityID INT IDENTITY(1,1) PRIMARY KEY,
    cityName VARCHAR(255) NOT NULL,
    stateID INT NULL,
    countryID INT NOT NULL
);

/* Original script preserved below for migration work */

--This is to test taking a note.

--This piece of the code clears out the statesTbl table to ensure I can easily run the create table piece that immediately follows. This helps make sure I can make updates to the table worry free.
DROP TABLE statesTbl;

--This piece creates the statesTbl table and defines what types of information each column will hold.
CREATE TABLE statesTbl (
	stateID Int IDENTITY (1,1),
	abbreviation char (2),
	stateName varchar(15),
	foundedDate date
);

--This section of the codes starts adding the rows of state information to the statesTbl.
INSERT INTO statesTbl (abbreviation, stateName)
VALUES
('DE', 'Delaware'),
('PA', 'Pennsylvania'),
('NJ', 'New Jersey'),
('GA', 'Georgia'),
('CT', 'Connecticut'),
('MA', 'Massachusetts'),
('MD', 'Maryland'),
('SC', 'South Carolina'),
('NH', 'New Hampshire'),
('VA', 'Virginia'),
('NY', 'New York'),
('NC', 'North Carolina'),
('RI', 'Rhode Island'),
('VT', 'Vermont'),
('KY', 'Kentucky'),
('TN', 'Tennessee'),
('OH', 'Ohio'),
('LA', 'Louisiana'),
('IN', 'Indiana'),
('MS', 'Mississippi'),
('IL', 'Illinois'),
('AL', 'Alabama'),
('ME', 'Maine'),
('MO', 'Missouri'),
('AR', 'Arkansas'),
('MI', 'Michigan'),
('FL', 'Florida'),
('TX', 'Texas'),
('IA', 'Iowa'),
('WI', 'Wisconsin'),
('CA', 'California'),
('MN', 'Minnesota'),
('OR', 'Oregon'),
('KS', 'Kansas'),
('WV', 'West Virginia'),
('NV', 'Nevada'),
('NE', 'Nebraska'),
('CO', 'Colorado'),
('ND', 'North Dakota'),
('SD', 'South Dakota'),
('MT', 'Montana'),
('WA', 'Washington'),
('ID', 'Idaho'),
('WY', 'Wyoming'),
('UT', 'Utah'),
('OK', 'Oklahoma'),
('NM', 'New Mexico'),
('AZ', 'Arizona'),
('AK', 'Alaska'),
('HI', 'Hawaii');

--This piece of the code clears out the plotEarnings table to ensure I can easily run the create table piece that immediately follows. This helps make sure I can make updates to the table worry free.
DROP TABLE plotEarnings

--This piece of the code creates the plotEarnings table to
CREATE TABLE plotEarnings (
	plotTypeID Int IDENTITY(1,1),
	plotType varchar(10),
	spawnPercent decimal(3,2),
	earningPerSecond decimal(12,11)
)

--This section of the codes starts adding the rows of the plot earnings to the plotEarnings table.
INSERT INTO plotEarnings (plotType, spawnPercent, earningPerSecond)
VALUES
    ('Common',   0.50, 0.00000000111),
    ('Rare',     0.30, 0.00000000160),
    ('Epic',     0.15, 0.00000000220),
    ('Legendary',0.05, 0.00000000440);

--This piece of the code clears out the passportBoosts table to ensure I can easily run the create table piece that immediately follows. This helps make sure I can make updates to the table worry free.
DROP TABLE passportBoosts

--This piece creates the passportBoosts table and defines what types of information each column will hold.
CREATE TABLE passportBoosts (
	passportBoostID Int IDENTITY(1,1),
	passportMinBound Int,
	passportMaxBound Int,
	passportBoostRate decimal(3,2)
);

--This section of the code starts adding the rows of the tiers for passport boosts in Atlas Earth to the passportBoosts table.
INSERT INTO passportBoosts (passportMinBound, passportMaxBound, passportBoostRate)
VALUES
    (0,    0,    0.00),
    (1,    10,   0.05),
    (11,   30,   0.10),
    (31,   60,   0.15),
    (61,   100,  0.20),
    (101,  9999, 0.25);

--This piece of the code clears out the adMultipliers table to ensure I can easily run the create table piece that immediately follows. This helps make sure I can make updates to the table worry free.
DROP TABLE adMultipliers

--This piece creates the adMultipliers table and defines what types of information each column will hold.
CREATE TABLE adMultipliers (
	aeMultID Int IDENTITY(1,1),
	plotMinBound Int,
	plotMaxBound Int,
	multiplierAmount Int
);


--This section of the code starts adding the rows of the tiers for passport boosts in Atlas Earth to the adMultipliers table.
INSERT INTO adMultipliers (plotMinBound, plotMaxBound,  multiplierAmount)
VALUES
    (1,    150,  30),
    (151,  220,  20),
    (221,  290,  15),
    (291,  365,  12),
    (366,  435,  10),
    (436,  545,   8),
    (546,  625,   7),
    (626,  730,   6),
    (731,  875,   5),
    (876, 1100,   4),
    (1101,1500,   3),
    (1501,NULL,   2);

--This piece of the code clears out the purchasedPlots table to ensure I can easily run the create table piece that immediately follows. This helps make sure I can make updates to the table worry free.
DROP TABLE purchasedPlots;

--This piece creates the purchasedPlots table and defines what types of information each column will hold.
CREATE TABLE purchasedPlots (
	plotNumber Int IDENTITY(1,1),
	purchaseDate date,
	plotType Int,
	cityLocation varchar(255),
	stateID Int,
	countryLocation varchar(255),
	plotNotes varchar(255)
);


--This section of the code starts adding the rows of the plots purchased in Atlas Earth  to the purchasedPlots table.
INSERT INTO purchasedPlots (purchaseDate, plotType, stateID, countryLocation, plotNotes)
VALUES ('2022-09-21', 1, 43, 'USA', 'Home')
INSERT INTO purchasedPlots (purchaseDate, plotType, stateID, countryLocation, plotNotes)
VALUES ('2022-09-22', 1, 43, 'USA', 'Home')
INSERT INTO purchasedPlots (purchaseDate, plotType, stateID, countryLocation, plotNotes)
VALUES ('2022-09-23', 1, 43, 'USA', 'Home')
INSERT INTO purchasedPlots (purchaseDate, plotType, stateID, countryLocation, plotNotes)
VALUES ('2022-09-24', 2, 43, 'USA', 'Home')
INSERT INTO purchasedPlots (purchaseDate, plotType, stateID, countryLocation, plotNotes)
VALUES ('2022-09-25', 2, 43, 'USA', 'Home')
INSERT INTO purchasedPlots (purchaseDate, plotType, stateID, countryLocation, plotNotes)
VALUES ('2022-09-26', 2, 43, 'USA', 'Home')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-09-27', 2, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-09-28', 1, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-09-29', 2, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-09-30', 2, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
--These Billings lines are notable because the plotNotes section also has an apostrophe in it, so I had to make sure SQL still caught the apostrophe without it messing up the rest of the code.
VALUES ('2022-10-01', 1, 'Billings', 41, 'USA', 'Kim & Steve''s place')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-10-02', 2, 'Billings', 41, 'USA', 'Kim & Steve''s place')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-10-03', 1, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-10-04', 2, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-10-05', 2, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-10-06', 1, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-10-07', 2, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-10-08', 3, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-10-09', 1, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-10-10', 1, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-10-11', 2, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-10-12', 4, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-10-13', 1, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-10-14', 1, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-10-15', 1, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-10-16', 4, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-10-17', 4, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-10-18', 1, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-10-19', 2, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-10-20', 4, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-10-21', 2, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-10-22', 1, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-10-24', 1, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-10-25', 3, 'Idaho Falls', 43, 'USA', '*Date guesstimated')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-10-26', 1, 'Idaho Falls', 43, 'USA', '*Date guesstimated')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-10-27', 3, 'Idaho Falls', 43, 'USA', '*Date guesstimated')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-10-28', 1, 'Idaho Falls', 43, 'USA', '*Date guesstimated')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-10-29', 1, 'Idaho Falls', 43, 'USA', '*Date guesstimated')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-11-01', 1, 'Idaho Falls', 43, 'USA', '*Date guesstimated')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-11-02', 1, 'Idaho Falls', 43, 'USA', '*Date guesstimated')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-11-03', 1, 'Idaho Falls', 43, 'USA', '*Date guesstimated')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-11-04', 4, 'Idaho Falls', 43, 'USA', '*Date guesstimated')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-11-05', 1, 'Idaho Falls', 43, 'USA', '*Date guesstimated')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-11-06', 2, 'Idaho Falls', 43, 'USA', '*Date guesstimated')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-11-07', 1, 'Idaho Falls', 43, 'USA', '*Date guesstimated')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-11-08', 2, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-11-09', 1, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-11-12', 2, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-11-14', 3, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-11-15', 1, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-11-16', 1, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-11-17', 2, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-11-18', 1, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-11-21', 1, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-11-22', 1, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-11-23', 3, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-11-25', 1, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-11-28', 1, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-11-28', 2, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-11-30', 2, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-12-01', 1, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-12-03', 1, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-12-06', 1, 'Idaho Falls', 43, 'USA', '*Date guesstimated')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-12-07', 3, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-12-08', 1, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-12-09', 1, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-12-10', 3, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-12-12', 1, 'Idaho Falls', 43, 'USA', '*Date guesstimated')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-12-14', 2, 'Idaho Falls', 43, 'USA', '*Date guesstimated')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-12-16', 1, 'Idaho Falls', 43, 'USA', '*Date guesstimated')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-12-17', 1, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-12-19', 1, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-12-20', 1, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation)
VALUES ('2022-12-20', 2, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-12-21', 1, 'Idaho Falls', 43, 'USA', 'Minifigure Mania')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-12-23', 1, 'Idaho Falls', 43, 'USA', 'Soccer ball statue by the soccer complex')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-12-24', 2, 'Idaho Falls', 43, 'USA', 'Rosemark')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-12-25', 1, 'Idaho Falls', 43, 'USA', 'ICCU intersection on the way to Kim''s place')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-12-26', 2, 'Idaho Falls', 43, 'USA', 'Idaho Falls Temple')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-12-26', 4, 'Idaho Falls', 43, 'USA', 'Idaho Falls Temple')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-12-26', 4, 'Idaho Falls', 43, 'USA', 'Idaho Falls Temple')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-12-26', 2, 'Idaho Falls', 43, 'USA', 'Idaho Falls Temple')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-12-26', 1, 'Idaho Falls', 43, 'USA', 'Idaho Falls Temple')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-12-26', 1, 'Idaho Falls', 43, 'USA', 'Idaho Falls Temple')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-12-26', 1, 'Idaho Falls', 43, 'USA', 'Idaho Falls Temple')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-12-26', 2, 'Idaho Falls', 43, 'USA', 'Idaho Falls Temple')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-12-26', 3, 'Idaho Falls', 43, 'USA', 'Idaho Falls Temple')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-12-26', 1, 'Idaho Falls', 43, 'USA', 'Idaho Falls Temple')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-12-26', 1, 'Idaho Falls', 43, 'USA', 'Idaho Falls Temple')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-12-26', 1, 'Idaho Falls', 43, 'USA', 'Idaho Falls Temple')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-12-26', 1, 'Idaho Falls', 43, 'USA', 'Idaho Falls Temple')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-12-26', 1, 'Idaho Falls', 43, 'USA', 'Idaho Falls Temple')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-12-26', 2, 'Idaho Falls', 43, 'USA', 'Idaho Falls Temple')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-12-26', 1, 'Idaho Falls', 43, 'USA', 'Destinations Inn')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-12-27', 1, 'Idaho Falls', 43, 'USA', 'Energy Way')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-12-29', 1, 'Idaho Falls', 43, 'USA', 'Energy Way')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-12-30', 2, 'Idaho Falls', 43, 'USA', 'Energy Way')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2022-12-31', 1, 'Idaho Falls', 43, 'USA', 'Indian statue by Fred Meyer')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-01-02', 1, 'Idaho Falls', 43, 'USA', 'Energy Way')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-01-03', 1, 'Idaho Falls', 43, 'USA', 'Energy Way')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-01-04', 1, 'Idaho Falls', 43, 'USA', 'Energy Way')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-01-05', 2, 'Idaho Falls', 43, 'USA', 'Energy Way')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-01-06', 1, 'Idaho Falls', 43, 'USA', 'Energy Way')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-01-07', 3, 'Idaho Falls', 43, 'USA', 'Madelyn''s friends'' baby shower house')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-01-08', 2, 'Idaho Falls', 43, 'USA', 'Energy Way')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-01-09', 1, 'Idaho Falls', 43, 'USA', 'Energy Way')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-01-10', 1, 'Idaho Falls', 43, 'USA', 'Energy Way')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-01-11', 2, 'Idaho Falls', 43, 'USA', 'Energy Way')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-01-12', 1, 'Idaho Falls', 43, 'USA', 'Energy Way')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-01-13', 1, 'Idaho Falls', 43, 'USA', 'Energy Way')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-01-13', 1, 'Idaho Falls', 43, 'USA', 'Idaho Falls Temple')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-01-15', 1, 'Idaho Falls', 43, 'USA', 'ICCU intersection on the way to Kim''s place')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-01-16', 1, 'Idaho Falls', 43, 'USA', 'Energy Way')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-01-17', 2, 'Idaho Falls', 43, 'USA', 'Indian statue by Fred Meyer')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-01-18', 2, 'Idaho Falls', 43, 'USA', 'Energy Way')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-01-19', 2, 'Idaho Falls', 43, 'USA', 'Energy Way')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-01-19', 1, 'Idaho Falls', 43, 'USA', 'Energy Way')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-01-21', 1, 'Idaho Falls', 43, 'USA', 'Coldwell Banker Tomlinson, close to the tractor statue')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-01-22', 3, 'Idaho Falls', 43, 'USA', 'Lincoln Stake Building')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-01-23', 2, 'Idaho Falls', 43, 'USA', 'Energy Way')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-01-24', 2, 'Idaho Falls', 43, 'USA', 'Energy Way')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-01-25', 2, 'Idaho Falls', 43, 'USA', 'Energy Way')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-01-26', 2, 'Idaho Falls', 43, 'USA', 'Energy Way')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-01-28', 2, 'Idaho Falls', 43, 'USA', 'Coldwell Banker Tomlinson, close to the tractor statue')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-01-29', 2, 'Idaho Falls', 43, 'USA', 'Lincoln Stake Building')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-02-07', 2, 'Idaho Falls', 43, 'USA', 'Energy Way')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-02-08', 3, 'Idaho Falls', 43, 'USA', 'Energy Way')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-02-09', 1, 'Idaho Falls', 43, 'USA', 'Energy Way')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-02-10', 3, 'Idaho Falls', 43, 'USA', 'Energy Way')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-02-11', 1, 'Idaho Falls', 43, 'USA', 'Smith, Kunz & Associates')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-02-12', 3, 'Idaho Falls', 43, 'USA', 'Lincoln Stake Building')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-02-13', 2, 'Idaho Falls', 43, 'USA', 'ICCU intersection of Taco Time and Arctic Circle')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-02-15', 1, 'Idaho Falls', 43, 'USA', 'Browning Law')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-02-16', 1, 'Idaho Falls', 43, 'USA', 'Energy Way')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-02-18', 1, 'Idaho Falls', 43, 'USA', 'Smith, Kunz & Associates')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-02-18', 1, 'Idaho Falls', 43, 'USA', 'ICCU intersection on the way to Kim''s place')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-02-21', 2, 'Idaho Falls', 43, 'USA', 'Energy Way')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-02-23', 1, 'Idaho Falls', 43, 'USA', 'Energy Way')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-02-24', 1, 'Idaho Falls', 43, 'USA', 'Energy Way')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-02-25', 1, 'Idaho Falls', 43, 'USA', 'Smith, Kunz & Associates')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-02-27', 4, 'Idaho Falls', 43, 'USA', 'Energy Way')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-02-27', 1, 'Idaho Falls', 43, 'USA', 'Energy Way')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-02-27', 2, 'Idaho Falls', 43, 'USA', 'Lincoln Stake Building')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-03-01', 3, 'Idaho Falls', 43, 'USA', 'Lincoln Stake Building')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-03-03', 3, 'Idaho Falls', 43, 'USA', 'Energy Way')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-03-06', 2, 'Idaho Falls', 43, 'USA', 'Energy Way')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-03-06', 1, 'Idaho Falls', 43, 'USA', 'Energy Way')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-03-08', 2, 'Idaho Falls', 43, 'USA', 'Energy Way')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-03-17', 1, 'Idaho Falls', 43, 'USA', 'Fred Meyer')
INSERT INTO purchasedPlots (purchaseDate, plotType, cityLocation, stateID, countryLocation, plotNotes)
VALUES ('2023-03-17', 3, 'Idaho Falls', 43, 'USA', 'Indian Statue by Fred Meyer')




--This piece of the code clears out the passportTier table to ensure I can easily run the create table piece that immediately follows. This helps make sure I can make updates to the table worry free.
DROP TABLE passportTier

--This piece of the code set the passport status types that a passport can have.
CREATE TABLE passportTier (
	passportTierID Int IDENTITY(1,1),
	passportTier varchar(10)
);

--This piece of the code adds the different passport tiers.
INSERT INTO passportTier (passportTier)
VALUES ('City')
INSERT INTO passportTier (passportTier)
VALUES ('State')
INSERT INTO passportTier (passportTier)
VALUES ('Country')

--This piece of the code clears out the purchasedPassports table to ensure I can easily run the create table piece that immediately follows. This helps make sure I can make updates to the table worry free.
DROP TABLE purchasedPassports

--This piece creates the purchasedPassports table and defines what types of information each column will hold.
CREATE TABLE purchasedPassports (
	passportNumber Int IDENTITY(1,1),
	purchaseDate date,
	passportLocation varchar(255),
	passportTierID Int,
	cityLocation varchar(255),
	stateID Int,
	countryLocation varchar(255),
);


--This section of the code starts adding the rows of purchased passports to the purchasedPassports table.
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, stateID, countryLocation)
VALUES ('2022-12-13', 'Idaho', 2, 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-02-03', 'Bozeman', 1, 'Bozeman', 41, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-02-04', 'Billings', 1, 'Billings', 41, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-02-05', 'West Yellowstone', 1, 'West Yellowstone', 41, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-03-10', 'Idaho Falls', 1, 'Idaho Falls', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-03-12', 'Shelley', 1, 'Shelley', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, countryLocation)
VALUES ('2023-03-15', 'USA', 3, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-03-23', 'Ucon', 1, 'Ucon', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-03-26', 'Ammon', 1, 'Ammon', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-03-26', 'Rigby', 1, 'Rigby', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-03-26', 'Iona', 1, 'Iona', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-03-26', 'Swan Valley', 1, 'Swan Valley', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-03-26', 'Irwin', 1, 'Irwin', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, stateID, countryLocation)
VALUES ('2023-03-26', 'Wyoming', 2, 44, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-03-26', 'Alpine', 1, 'Alpine', 44, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-03-26', 'Thayne', 1, 'Thayne', 44, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-03-26', 'Afton', 1, 'Afton', 44, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-06-01', 'Chubbuck', 1, 'Chubbuck', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-06-07', 'Dubois', 1, 'Dubois', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-06-07', 'Deer Lodge County', 1, 'Deer Lodge County', 41, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-06-07', 'Missoula', 1, 'Missoula', 41, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-06-07', 'Superior', 1, 'Superior', 41, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-06-07', 'Wallace', 1, 'Wallace', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-06-07', 'Osburn', 1, 'Osburn', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-06-07', 'Post Falls', 1, 'Post Falls', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-06-07', 'Spokane Valley', 1, 'Spokane Valley', 42, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-06-08', 'Spokane', 1, 'Spokane', 42, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-06-08', 'Moses Lake', 1, 'Moses Lake', 42, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-06-10', 'Lynden', 1, 'Lynden', 42, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-06-13', 'Bellingham', 1, 'Bellingham', 42, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, stateID, countryLocation)
VALUES ('2023-06-16', 'Washington', 2, 42, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, stateID, countryLocation)
VALUES ('2023-06-18', 'Oregon', 2, 33, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-07-14', 'Moore', 1, 'Moore', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-07-14', 'Mackay', 1, 'Mackay', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-07-14', 'Clayton', 1, 'Clayton', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-07-14', 'Stanley', 1, 'Stanley', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-07-16', 'Challis', 1, 'Challis', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-07-16', 'Arco', 1, 'Arco', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-07-16', 'Butte City', 1, 'Butte City', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-07-18', 'Heyburn', 1, 'Heyburn', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-07-18', 'Burley', 1, 'Burley', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-07-18', 'Jerome', 1, 'Jerome', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-07-18', 'Boise', 1, 'Boise', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-07-18', 'Garden City', 1, 'Garden City', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-07-28', 'Salt Lake City', 1, 'Salt Lake City', 45, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-07-28', 'Sandy', 1, 'Sandy', 45, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-07-28', 'Draper', 1, 'Draper', 45, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-07-28', 'Lindon', 1, 'Lindon', 45, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, stateID, countryLocation)
VALUES ('2023-07-29', 'Utah', 2, 45, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-08-12', 'Inkom', 1, 'Inkom', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-08-12', 'Arimo', 1, 'Arimo', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-08-12', 'Downey', 1, 'Downey', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, stateID, countryLocation)
VALUES ('2023-09-03', 'Arizona', 2, 48, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-09-03', 'Phoenix', 1, 'Phoenix', 48, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-09-04', 'Scottsdale', 1, 'Scottsdale', 48, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-09-04', 'Tempe', 1, 'Tempe', 48, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-09-05', 'Mesa', 1, 'Mesa', 48, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-09-05', 'Gilbert', 1, 'Gilbert', 48, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-09-06', 'Chandler', 1, 'Chandler', 48, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-09-08', 'Glendale', 1, 'Glendale', 48, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-09-08', 'Peoria', 1, 'Peoria', 48, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-09-08', 'Youngtown', 1, 'Youngtown', 48, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-09-08', 'El Mirage', 1, 'El Mirage', 48, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-09-08', 'Surprise', 1, 'Surprise', 48, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-09-08', 'Litchfield Park', 1, 'Litchfield Park', 48, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-09-08', 'Goodyear', 1, 'Goodyear', 48, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-09-08', 'Avondale', 1, 'Avondale', 48, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-10-08', 'Ririe', 1, 'Ririe', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, stateID, countryLocation)
VALUES ('2023-09-12', 'Nevada', 2, 36, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-10-12', 'Wells', 1, 'Wells', 36, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-10-12', 'Elko', 1, 'Elko', 36, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-10-12', 'Eureka County', 1, 'Eureka County', 36, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-10-12', 'Winnemucca', 1, 'Winnemucca', 36, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-10-12', 'Fernley', 1, 'Fernley', 36, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-10-12', 'Wadsworth', 1, 'Wadsworth', 36, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-10-12', 'Sparks', 1, 'Sparks', 36, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-10-12', 'Reno', 1, 'Reno', 36, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-10-12', 'Verdi-Mogul', 1, 'Verdi-Mogul', 36, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, stateID, countryLocation)
VALUES ('2023-09-12', 'California', 2, 31, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-10-12', 'Storey County', 1, 'Storey County', 36, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-10-12', 'Lovelock', 1, 'Lovelock', 36, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-10-12', 'Battle Mountain', 1, 'Battle Mountain', 36, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-10-12', 'Carlin', 1, 'Carlin', 36, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-10-08', 'Hollister', 1, 'Hollister', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-10-20', 'Ashton', 1, 'Ashton', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, stateID, countryLocation)
VALUES ('2023-11-03', 'Montana', 2, 41, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-11-03', 'Big Timber', 1, 'Big Timber', 41, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-11-05', 'Laurel', 1, 'Laurel', 41, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-11-05', 'Columbus', 1, 'Columbus', 41, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-11-05', 'Livingston', 1, 'Livingston', 41, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-11-05', 'Belgrade', 1, 'Belgrade', 41, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-11-16', 'Rexburg', 1, 'Rexburg', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-11-16', 'Menan', 1, 'Menan', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-11-16', 'Lewisville', 1, 'Lewisville', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-12-03', 'Basalt', 1, 'Basalt', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-12-21', 'Sugar City', 1, 'Sugar City', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-12-21', 'Teton', 1, 'Teton', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2023-12-21', 'St. Anthony', 1, 'St. Anthony', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2024-01-11', 'Blackfoot', 1, 'Blackfoot', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2024-01-11', 'Pocatello', 1, 'Pocatello', 43, 'USA')
INSERT INTO purchasedPassports (purchaseDate, passportLocation, passportTierID, cityLocation, stateID, countryLocation)
VALUES ('2024-01-11', 'American Falls', 1, 'American Falls', 43, 'USA')




--This is just a basic query to view the statesTbl table created.
SELECT *
FROM statesTbl

--This is just a basic query to view the plotEarnings table created.
SELECT *
FROM plotEarnings

--This is just a basic query to view the passportBoosts table created.
SELECT *
FROM passportBoosts

--This is just a basic query to view the adMultipliers table created.
SELECT *
FROM adMultipliers

--This is just a basic query to view the purchasedPlots table created.
SELECT *
FROM purchasedPlots
Order By plotType -- This line was added to test the IDENTITY code I'm using for the plotNumber field to ensure it doesn't auto-increment on the queried, information, but rather on the order they items are brought into the table.

--This is just a basic query to view the passportTier table created.
SELECT *
FROM passportTier

--This is just a basic query to view the purchasedPassports table created.
SELECT *
FROM purchasedPassports

--The following four queries get a count of each type of plot purchased.
SELECT COUNT(plotType) as 'Common Count'
FROM purchasedPlots
WHERE plotType = 1

SELECT COUNT(plotType) as 'Rare Count'
FROM purchasedPlots
WHERE plotType = 2

SELECT COUNT(plotType) as 'Epic Count'
FROM purchasedPlots
WHERE plotType = 3

SELECT COUNT(plotType) as 'Legendary Count'
FROM purchasedPlots
WHERE plotType = 4

--The following is just me testing joins.
SELECT plotNumber, plotEarnings.plotType as 'Plot Type'
FROM purchasedPlots
JOIN plotEarnings ON purchasedPlots.plotType = plotEarnings.plotTypeID