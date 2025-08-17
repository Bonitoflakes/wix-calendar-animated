import { Calendar } from "@/packages/calendar";
import { useCalendar } from "@/packages/calendar/calendar-context";
import { View, Text, Button } from "react-native";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});

export default function TabFourScreen() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const handleSubmit = form.handleSubmit(
    (data) => alert(JSON.stringify(data)),
    (err) => alert(JSON.stringify(err))
  );

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 50,
      }}
    >
      <Text>
        gibberish Lot of gibberish Lot of gibberish Lot of gibberish Lot of gibberish Lot
        of gibberish Lot of gibberish Lot of gibberish Lot of gibberish
      </Text>

      <Controller
        control={form.control}
        name="dob"
        render={({ field }) => {
          return (
            <Calendar.Root value={field.value} onChange={field.onChange}>
              <Calendar.Trigger
                pressableStyle={{ backgroundColor: "lightblue", margin: 20 }}
              >
                <MyText />
              </Calendar.Trigger>
              <Calendar.Modal>
                <Calendar.Content />
              </Calendar.Modal>
            </Calendar.Root>
          );
        }}
      />

      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum.
      </Text>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const MyText = () => {
  const { value: selectedDate } = useCalendar();

  if (!selectedDate) return <Text>dd-mm-yyyy</Text>;

  return (
    <Text>
      Open Calendar:
      {format(selectedDate, "do MMMM, yyyy")}
    </Text>
  );
};
