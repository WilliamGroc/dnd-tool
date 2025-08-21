import { integer, text, varchar, serial, pgTable, real, timestamp, boolean } from 'drizzle-orm/pg-core';

export const journey = pgTable('journey', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  startDate: timestamp('start_date').notNull().defaultNow(),
  userId: integer('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
});

// PlayerCharacter table
export const playerCharacter = pgTable('player_character', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  maxHp: integer('max_hp').default(10),
  currentHp: integer('current_hp').default(10),
  characterClass: varchar('character_class', { length: 50 }),
  race: varchar('race', { length: 50 }),
  level: integer('level').default(1),
  strength: integer('strength').default(10),
  dexterity: integer('dexterity').default(10),
  constitution: integer('constitution').default(10),
  intelligence: integer('intelligence').default(10),
  wisdom: integer('wisdom').default(10),
  charisma: integer('charisma').default(10),
  experience: integer('experience').default(0),
  speed: integer('speed').default(30),
  journeyId: integer('journey_id').notNull().references(() => journey.id, { onDelete: 'cascade' }),
});

// Item table
export const item = pgTable('item', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  ownerId: integer('owner_id').notNull().references(() => playerCharacter.id, { onDelete: 'cascade' }),
});

// Quest table
export const quest = pgTable('quest', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 200 }).notNull(),
  description: text('description'),
  reward: varchar('reward', { length: 100 }),
  journeyId: integer('journey_id').notNull().references(() => journey.id, { onDelete: 'cascade' }),
  status: varchar('status', { length: 50 }).default('Active'),
});

// Creature table
export const creature = pgTable('creature', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  hp: integer('hp').notNull(),
  armorClass: integer('armor_class').default(10),
  strength: integer('strength').default(10),
  dexterity: integer('dexterity').default(10),
  constitution: integer('constitution').default(10),
  intelligence: integer('intelligence').default(10),
  wisdom: integer('wisdom').default(10),
  charisma: integer('charisma').default(10),
  journeyId: integer('journey_id').notNull().references(() => journey.id, { onDelete: 'cascade' }),
});

// Encounter table
export const encounter = pgTable('encounter', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().default('Nouvelle Rencontre'),
  currentTurn: integer('current_turn').default(0),
});

// Participant table
export const encounterParticipant = pgTable('encounter_participant', {
  id: serial('id').primaryKey(),
  initiativeRoll: integer('initiative_roll'),
  playerCharacterId: integer('player_character_id').notNull().references(() => playerCharacter.id, { onDelete: 'cascade' }),
  encounterId: integer('encounter_id').notNull().references(() => encounter.id, { onDelete: 'cascade' }),
});

export const encounterCreature = pgTable('encounter_creature', {
  id: serial('id').primaryKey(),
  initiativeRoll: integer('initiative_roll'),
  creatureId: integer('creature_id').notNull().references(() => creature.id, { onDelete: 'cascade' }),
  currentHp: integer('current_hp').notNull(),
  encounterId: integer('encounter_id').notNull().references(() => encounter.id, { onDelete: 'cascade' }),
});

export const user = pgTable('user', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const session = pgTable('session', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().unique().references(() => user.id, { onDelete: 'cascade' }),
  token: varchar('token', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  expiresAt: timestamp('expires_at', { withTimezone: false }).notNull()
});