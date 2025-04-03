
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import NewProjectForm from "@/components/dashboard/NewProjectForm";

const NewProjectPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">New Project</h1>
          <p className="text-muted-foreground">
            Create a new project by connecting a GitHub repository.
          </p>
        </div>

        <NewProjectForm />
      </div>
    </DashboardLayout>
  );
};

export default NewProjectPage;
