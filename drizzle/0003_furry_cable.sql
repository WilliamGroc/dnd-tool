ALTER TABLE "player_character_journey" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "player_character_journey" CASCADE;--> statement-breakpoint
ALTER TABLE "creature" ADD COLUMN "journey_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "player_character" ADD COLUMN "race" varchar(50);--> statement-breakpoint
ALTER TABLE "player_character" ADD COLUMN "experience" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "player_character" ADD COLUMN "speed" integer DEFAULT 30;--> statement-breakpoint
ALTER TABLE "player_character" ADD COLUMN "journey_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "creature" ADD CONSTRAINT "creature_journey_id_journey_id_fk" FOREIGN KEY ("journey_id") REFERENCES "public"."journey"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player_character" ADD CONSTRAINT "player_character_journey_id_journey_id_fk" FOREIGN KEY ("journey_id") REFERENCES "public"."journey"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "creature" DROP COLUMN "challenge_rating";--> statement-breakpoint
ALTER TABLE "player_character" DROP COLUMN "player_name";