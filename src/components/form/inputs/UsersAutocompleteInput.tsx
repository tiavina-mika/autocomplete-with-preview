import { FC, Fragment, useEffect, useState } from "react";

import { Autocomplete, Stack, TextField } from "@mui/material";
import { MemberOption } from "../../../types/teamTypes";

type Props = {
  value: any;
  label?: string;
  options: any[];
  onChange: (value: any) => void;
  placeholder?: string;
  onChangeList?: (value: MemberOption[]) => void;
};

const UsersAutocompleteInput: FC<Props> = ({
  value,
  label,
  onChange,
  placeholder,
  onChangeList,
  options = []
}) => {
  const [values, setValues] = useState<MemberOption[]>([]);
  const [dynamicOptions, setDynamicOptions] = useState<any[]>([]);

  useEffect(() => setDynamicOptions(options), [options]);

  const handleChange = (value) => {
    const newValues = [value, ...values];
    setValues(newValues);
    onChangeList?.(newValues);
    onChange(value);

    const index = options.findIndex((obj) => obj.id === value.id);
    options.splice(index, 1);
    setDynamicOptions(options);
  };

  return (
    <Fragment>
      <Stack spacing={1.6}>
        <Autocomplete
          sx={{ flex: 1 }}
          value={value}
          onChange={(event, newValue) => {
            console.log("newValue", newValue);
            handleChange(newValue);
          }}
          inputValue=""
          options={dynamicOptions}
          getOptionLabel={(option) => {
            return option.label || "";
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          freeSolo
          disableClearable
          renderInput={(params) => (
            <TextField {...params} placeholder={placeholder} label={label} />
          )}
        />

        {/* ------- preview ------- */}
        {values.length > 0 && (
          <Stack direction="row" spacing={2}>
            {values.map((preview, index) => (
              <div key={index}>{preview.label}</div>
            ))}
          </Stack>
        )}
      </Stack>
    </Fragment>
  );
};

export default UsersAutocompleteInput;
