import React from "react";
import { Formik, Field, FieldArray, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, TextField, Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const validationSchema = Yup.object().shape({
  friends: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        time: Yup.date().required("Time is required").nullable(),
      })
    )
    .required("Must have friends")
    .min(1, "Minimum of 1 friend is required"),
});

const DynamicForm = () => {
  return (
    <Formik
      initialValues={{
        friends: [{ name: "", email: "", time: null }],
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <FieldArray name="friends">
            {({ insert, remove, push }) => (
              <div>
                {values.friends.length > 0 &&
                  values.friends.map((friend, index) => (
                    <div key={index}>
                      <Box marginBottom={2}>
                        <label htmlFor={`friends.${index}.name`}>Name</label>
                        <Field
                          name={`friends.${index}.name`}
                          placeholder="Jane Doe"
                          type="text"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                        />
                        <ErrorMessage
                          name={`friends.${index}.name`}
                          component="div"
                          className="field-error"
                        />
                      </Box>
                      <Box marginBottom={2}>
                        <label htmlFor={`friends.${index}.email`}>Email</label>
                        <Field
                          name={`friends.${index}.email`}
                          placeholder="jane@acme.com"
                          type="email"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                        />
                        <ErrorMessage
                          name={`friends.${index}.email`}
                          component="div"
                          className="field-error"
                        />
                      </Box>
                      <Box marginBottom={2}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DateTimePicker
                            label="Time"
                            value={values.friends[index].time}
                            onChange={(value) =>
                              setFieldValue(`friends.${index}.time`, value)
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"
                                fullWidth
                              />
                            )}
                          />
                        </LocalizationProvider>
                        <ErrorMessage
                          name={`friends.${index}.time`}
                          component="div"
                          className="field-error"
                        />
                      </Box>
                      <Button
                        type="button"
                        variant="contained"
                        color="secondary"
                        onClick={() => remove(index)}
                      >
                        X
                      </Button>
                    </div>
                  ))}
                <Button
                  type="button"
                  variant="contained"
                  onClick={() => push({ name: "", email: "", time: null })}
                >
                  Add Friend
                </Button>
              </div>
            )}
          </FieldArray>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default DynamicForm;
