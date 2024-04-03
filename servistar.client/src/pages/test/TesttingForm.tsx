import { NewCourse } from "./NewCurse";
import { FormProviderCreateCustomer } from "./testConfig";

export default function TesttingForm() {
  return (
    <main className="container mx-auto">
      <FormProviderCreateCustomer>
        <NewCourse />
      </FormProviderCreateCustomer>
    </main>
  );
}
