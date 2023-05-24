import { FC } from "react";

import { FormControl, FormHelperText } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

import InputLabel from "../InputLabel";
import UsersAutocompleteInput from "../inputs/UsersAutocompleteInput";
import { MemberOption } from "../../../types/teamTypes";

type Props = {
  name: string;
  label?: string;
  tooltip?: string;
  required?: boolean;
  options: MemberOption[];
  fixedLabel?: string;
  fullWidth?: boolean;
  helperText?: string;
  placeholder?: string;
};

const UsersAutcompleteField: FC<Props> = ({
  name,
  label,
  tooltip,
  fixedLabel,
  required,
  fullWidth,
  helperText,
  placeholder,
  options = []
}) => {
  // hooks
  const {
    control,
    formState: { errors },
    setValue
  } = useFormContext();

  return (
    <FormControl
      component="fieldset"
      error={!!errors?.[name]}
      fullWidth={fullWidth}
    >
      {fixedLabel && (
        <InputLabel
          label={fixedLabel}
          tooltip={tooltip}
          required={required}
          sx={{ color: "#000" }}
        />
      )}
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field: { value, onChange } }: any): any => {
          return (
            <UsersAutocompleteInput
              value={value}
              onChange={onChange}
              options={options}
              label={label}
              placeholder={placeholder}
              onChangeList={(values: MemberOption[]) =>
                setValue("members", values)
              }
            />
          );
        }}
      />
      {errors[name] ? (
        <FormHelperText error>{(errors as any)[name].message}</FormHelperText>
      ) : (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default UsersAutcompleteField;
