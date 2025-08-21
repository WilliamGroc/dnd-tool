ALTER TABLE "quest" ADD COLUMN "reward" varchar(100);--> statement-breakpoint
ALTER TABLE "quest" ADD COLUMN "journey_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "quest" ADD CONSTRAINT "quest_journey_id_journey_id_fk" FOREIGN KEY ("journey_id") REFERENCES "public"."journey"("id") ON DELETE cascade ON UPDATE no action;