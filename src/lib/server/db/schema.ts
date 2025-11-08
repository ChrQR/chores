import { relations } from 'drizzle-orm';
import { pgTable, serial, integer, uuid, text, pgEnum, boolean, time, timestamp } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: uuid('id').defaultRandom().unique(),
  name: text('name')
});

export const userRelations = relations(user, ({ many }) => ({
  taskCompletions: many(taskCompletion),
  subTaskCompletions: many(subTaskCompletion),
}));

export const recurrenceTypeEnum = pgEnum("recurrencetype", ["DAILY", "WEEKLY", "MONTHLY"])
export const timeOfDayEnum = pgEnum("timeofday", ["MORNING", "AFTERNOON", "EVENING"])

export const task = pgTable('task', {
  id: uuid('id').defaultRandom().unique(),
  title: text('title').notNull(),
  description: text('description'),
  recurrenceType: recurrenceTypeEnum('recurrenceType').default("DAILY").notNull(),
  recurrenceInterval: integer('recurrenceInterval').default(1).notNull(),
  timeOfDay: timeOfDayEnum('timeOfDay'),
  isActive: boolean('isActive').default(true).notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
})

export const taskRelations = relations(task, ({ many }) => ({
  subTasks: many(subTask),
  completions: many(taskCompletion),
}));

export const subTask = pgTable('subTask', {
  id: uuid('id').defaultRandom().unique(),
  title: text('title').notNull(),
  taskId: uuid('taskId').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
});

export const subtaskRelations = relations(subTask, ({ one, many }) => ({
  task: one(task, {
    fields: [subTask.taskId],
    references: [task.id],
  }),
  completions: many(subTaskCompletion),
}));


export const taskCompletion = pgTable('taskCompletion', {
  id: uuid('id').defaultRandom().unique(),
  taskId: uuid('taskId').notNull(),
  userId: uuid('userId').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
});

export const taskCompletionRelations = relations(taskCompletion, ({ one }) => ({
  task: one(task, {
    fields: [taskCompletion.taskId],
    references: [task.id],
  }),
  user: one(user, {
    fields: [taskCompletion.userId],
    references: [user.id],
  }),
}));

export const subTaskCompletion = pgTable('subTaskCompletion', {
  id: uuid('id').defaultRandom().unique(),
  subTaskId: uuid('subTaskId').notNull(),
  userId: uuid('userId').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
})

export const subTaskCompletionRelations = relations(subTaskCompletion, ({ one }) => ({
  task: one(subTask, {
    fields: [subTaskCompletion.subTaskId],
    references: [subTask.id],
  }),
  user: one(user, {
    fields: [subTaskCompletion.userId],
    references: [user.id],
  }),
}));
