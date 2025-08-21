CREATE TABLE "creature" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"hp" integer NOT NULL,
	"armor_class" integer DEFAULT 10,
	"challenge_rating" real DEFAULT 1,
	"strength" integer DEFAULT 10,
	"dexterity" integer DEFAULT 10,
	"constitution" integer DEFAULT 10,
	"intelligence" integer DEFAULT 10,
	"wisdom" integer DEFAULT 10,
	"charisma" integer DEFAULT 10
);
--> statement-breakpoint
CREATE TABLE "encounter" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) DEFAULT 'Nouvelle Rencontre' NOT NULL,
	"current_turn" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "encounter_creature" (
	"id" serial PRIMARY KEY NOT NULL,
	"initiative_roll" integer,
	"creature_id" integer NOT NULL,
	"current_hp" integer NOT NULL,
	"encounter_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "encounter_participant" (
	"id" serial PRIMARY KEY NOT NULL,
	"initiative_roll" integer,
	"player_character_id" integer NOT NULL,
	"encounter_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "item" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"owner_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "journey" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"start_date" timestamp DEFAULT now() NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "player_character" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"player_name" varchar(100),
	"current_hp" integer DEFAULT 10,
	"character_class" varchar(50),
	"level" integer DEFAULT 1,
	"strength" integer DEFAULT 10,
	"dexterity" integer DEFAULT 10,
	"constitution" integer DEFAULT 10,
	"intelligence" integer DEFAULT 10,
	"wisdom" integer DEFAULT 10,
	"charisma" integer DEFAULT 10,
	CONSTRAINT "player_character_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "player_character_journey" (
	"id" serial PRIMARY KEY NOT NULL,
	"player_character_id" integer NOT NULL,
	"journey_id" integer NOT NULL,
	"joined_at" timestamp DEFAULT now() NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quest" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(200) NOT NULL,
	"description" text,
	"status" varchar(50) DEFAULT 'Active'
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"token" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(50) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"email" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_username_unique" UNIQUE("username"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "encounter_creature" ADD CONSTRAINT "encounter_creature_creature_id_creature_id_fk" FOREIGN KEY ("creature_id") REFERENCES "public"."creature"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "encounter_creature" ADD CONSTRAINT "encounter_creature_encounter_id_encounter_id_fk" FOREIGN KEY ("encounter_id") REFERENCES "public"."encounter"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "encounter_participant" ADD CONSTRAINT "encounter_participant_player_character_id_player_character_id_fk" FOREIGN KEY ("player_character_id") REFERENCES "public"."player_character"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "encounter_participant" ADD CONSTRAINT "encounter_participant_encounter_id_encounter_id_fk" FOREIGN KEY ("encounter_id") REFERENCES "public"."encounter"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "item" ADD CONSTRAINT "item_owner_id_player_character_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."player_character"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "journey" ADD CONSTRAINT "journey_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player_character_journey" ADD CONSTRAINT "player_character_journey_player_character_id_player_character_id_fk" FOREIGN KEY ("player_character_id") REFERENCES "public"."player_character"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player_character_journey" ADD CONSTRAINT "player_character_journey_journey_id_journey_id_fk" FOREIGN KEY ("journey_id") REFERENCES "public"."journey"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;