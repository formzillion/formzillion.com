-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_connection_id_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_workflow_id_fkey";

-- DropForeignKey
ALTER TABLE "workflows" DROP CONSTRAINT "workflows_form_id_fkey";

-- DropForeignKey
ALTER TABLE "workflows" DROP CONSTRAINT "workflows_team_id_fkey";

-- AddForeignKey
ALTER TABLE "workflows" ADD CONSTRAINT "workflows_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflows" ADD CONSTRAINT "workflows_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_connection_id_fkey" FOREIGN KEY ("connection_id") REFERENCES "connections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_workflow_id_fkey" FOREIGN KEY ("workflow_id") REFERENCES "workflows"("id") ON DELETE CASCADE ON UPDATE CASCADE;
