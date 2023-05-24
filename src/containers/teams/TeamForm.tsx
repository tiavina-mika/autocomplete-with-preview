import { FC, FormEvent } from "react";
import { Button, Stack } from "@mui/material";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TeamInput } from "../../types/teamTypes";
import { teamSchema } from "../../utils/validations/teamValidations";
import UsersAutocompleteField from "../../components/form/fields/UsersAutcompleteField";

const users = [
  { id: "01", firstName: "user1" },
  { id: "02", firstName: "user3" },
  { id: "04", firstName: "user4" }
];
type Props = {
  formId: string;
  onSubmit: (values: TeamInput) => void;
  hasParentForm?: boolean;
};

const TeamForm: FC<Props> = ({ formId, onSubmit, hasParentForm = false }) => {
  const form = useForm<TeamInput>({
    resolver: zodResolver(teamSchema)
  });

  const { handleSubmit } = form;

  const _onSubmit: SubmitHandler<TeamInput> = (values) => {
    console.log("values", values);
    onSubmit?.(values);
  };

  const handleSubmitWithoutPropagation = (
    event: FormEvent<HTMLFormElement>
  ) => {
    // if nested form
    if (hasParentForm) {
      event.preventDefault();
      event.stopPropagation();
    }

    handleSubmit(_onSubmit)(event);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmitWithoutPropagation} id={formId}>
        <Stack spacing={4}>
          {/* -------- inputs -------- */}
          <UsersAutocompleteField
            name="member"
            fullWidth
            options={users.map((user) => ({
              label: user.firstName,
              id: user.id
            }))}
          />

          {/* -------- button -------- */}
          <Button type="submit" variant="contained" form={formId}>
            Save
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default TeamForm;
