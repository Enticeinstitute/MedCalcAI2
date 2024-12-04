import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BMICalculator from "../components/medical/BMICalculator";
import BMRCalculator from "../components/medical/BMRCalculator";
import BSACalculator from "../components/medical/BSACalculator";

export default function Home() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
        Medical Calculators
      </h1>
      
      <Tabs defaultValue="bmi" className="w-full max-w-2xl mx-auto">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="bmi">BMI</TabsTrigger>
          <TabsTrigger value="bmr">BMR</TabsTrigger>
          <TabsTrigger value="bsa">BSA</TabsTrigger>
        </TabsList>
        <TabsContent value="bmi">
          <BMICalculator />
        </TabsContent>
        <TabsContent value="bmr">
          <BMRCalculator />
        </TabsContent>
        <TabsContent value="bsa">
          <BSACalculator />
        </TabsContent>
      </Tabs>
    </div>
  );
}
