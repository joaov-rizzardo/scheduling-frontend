import { ScrollArea } from "@/components/ui/scroll-area";
import { CompanyForm } from "./_components/company-form";
import { StepHeader } from "./_components/step-header";

export default function CreateCompany() {
  return (
    <ScrollArea className="h-full">
      <div className="pt-7 h-full flex flex-col items-center justify-center">
        <StepHeader />
        <CompanyForm />
      </div>
    </ScrollArea>
  );
}
