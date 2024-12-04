import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import styles from "./styles.module.css";

const formSchema = z.object({
  weight: z.number().positive().min(20).max(500),
  height: z.number().positive().min(50).max(300)
});

type FormData = z.infer<typeof formSchema>;

export default function BSACalculator() {
  const [result, setResult] = useState<number | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weight: undefined,
      height: undefined
    }
  });

  const calculateBSA = (data: FormData) => {
    const bsa = Math.sqrt((data.height * data.weight) / 3600);
    setResult(parseFloat(bsa.toFixed(2)));
  };

  const onSubmit = (data: FormData) => {
    calculateBSA(data);
  };

  const resetForm = () => {
    form.reset();
    setResult(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Body Surface Area (BSA) Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (kg)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter weight"
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height (cm)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter height"
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <Button type="submit">Calculate</Button>
              <Button type="button" variant="outline" onClick={resetForm}>Reset</Button>
            </div>
          </form>
        </Form>

        {result && (
          <div className={styles.result}>
            <p className="text-lg font-semibold">BSA: {result} m²</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
