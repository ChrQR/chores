import z from "zod";
import { recurrenceTypeEnum, timeOfDayEnum } from "./server/db/schema";
import { coercedInt } from "./utils";

const timeOfDaySchema = z.preprocess(
  val => val === "" ? undefined : val,
  z.enum(timeOfDayEnum.enumValues).optional()
);

const recurrenceTypeSchema = z.preprocess(
  val => val === "" ? undefined : val,
  z.enum(recurrenceTypeEnum.enumValues).optional()
);

export const taskSchema = z.object({
  title: z.string().nonempty("Titel er paakraevet"),
  description: z.string().max(500, "Beskrivelse kan max vaere 500 tegn").transform((val) => val === "" ? null : val).optional(),
  recurrenceType: recurrenceTypeSchema,
  recurrenceInterval: coercedInt,
  timeOfDay: timeOfDaySchema,
  isActive: z.boolean().default(true)
})
