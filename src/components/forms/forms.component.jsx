import { useForm } from "react-hook-form";

import {
  Box,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
} from "@mui/material";

import forms from "src/config/forms";
import { Loading } from "src/components";

const FormsComponent = ({
  name,
  button,
  btnStyle,
  def,
  callback,
  selectData,
  additional,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: def,
  });

  const form = forms[name];

  const onSubmit = (data) => callback(data);

  const renderActions = (name, button) => {
    switch (name) {
      case "add_bus":
        button.onclick(def._id, { deleted: def.deleted });
        break;
      case "add_piece":
        button.onclick(def._id, { deleted: def.deleted });
        break;
      case "add_project":
        button.onclick(def._id, { deleted: def.deleted });
        break;
      case "add_status":
        button.onclick(def._id, { deleted: def.deleted });
        break;
      case "add_subpiece":
        button.onclick(def._id, { deleted: def.deleted });
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {Object.entries(form).map(([name, field]) => {
        switch (field.type) {
          case "radio":
            return (
              <Box>
                <FormControl margin="normal">
                  <FormLabel>{field.label}</FormLabel>
                  <RadioGroup defaultValue={def && def[name]} row>
                    {field.items.map((item) => (
                      <FormControlLabel
                        value={item.value}
                        {...register(name)}
                        label={item.label}
                        control={<Radio />}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
                <br />
              </Box>
            );
          case "checkbox":
            return (
              <Box>
                <FormControl margin="normal">
                  <FormLabel>{field.label}</FormLabel>
                  <RadioGroup defaultValue={def && def[name]} row>
                    {field.items.map((item) => (
                      <FormControlLabel
                        value={item.value}
                        {...register(name)}
                        label={item.label}
                        control={<Checkbox />}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
                <br />
              </Box>
            );
          case "color":
            return (
              <TextField
                key={name}
                {...register(name)}
                label={field.label}
                type="color"
                placeholder={field.placeholder}
                margin="normal"
                fullWidth
              />
            );
          case "date":
            return (
              <Box></Box>
              // <LocalizationProvider dateAdapter={AdapterJalaali}>
              //   <TextField
              //     key={name}
              //     {...register(name)}
              //     label={field.label}
              //     type="date"
              //     placeholder={field.placeholder}
              //     margin="normal"
              //     fullWidth
              //   />
              // </LocalizationProvider>
            );
          case "select":
            return (
              <FormControl margin="normal" fullWidth>
                <InputLabel>{field.label}</InputLabel>
                <Select
                  defaultValue={def && def[name]}
                  {...register(name)}
                  placeholder={field.placeholder}
                  label={field.label}
                >
                  {field.options.map((option) => (
                    <MenuItem value={option.value}>{option.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          case "selectData":
            const selected = selectData[name];

            return (
              <FormControl margin="normal" fullWidth>
                <InputLabel>{field.label}</InputLabel>
                {selected ? (
                  <Select
                    defaultValue={def && def[name]}
                    {...register(name)}
                    placeholder={field.placeholder}
                    label={field.label}
                  >
                    {selected.map((item) => (
                      <MenuItem value={item[field.value]}>
                        {item[field.option]}
                      </MenuItem>
                    ))}
                  </Select>
                ) : (
                  <Loading />
                )}
              </FormControl>
            );
          case "textarea":
            return (
              <TextField
                key={name}
                {...register(name)}
                label={field.label}
                type={field.secure ? "password" : field.type}
                placeholder={field.placeholder}
                margin="normal"
                rows={5}
                fullWidth
                multiline
              />
            );
          default:
            return (
              <TextField
                key={name}
                {...register(name)}
                label={field.label}
                type={field.secure ? "password" : field.type}
                placeholder={field.placeholder}
                margin="normal"
                fullWidth
              />
            );
        }
      })}
      {button && (
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSubmit(onSubmit)}
          sx={{ color: "white", mt: 1 }}
          fullWidth={btnStyle.fullWidth}
          disabled={btnStyle.disabled}
          disableElevation
        >
          {button}
        </Button>
      )}
      {additional &&
        additional.map((button) => (
          <Button
            variant="contained"
            color={button.color}
            size="large"
            onClick={() => renderActions(name, button)}
            sx={{ color: "white", mt: 1, mr: 1 }}
            disabled={name === "add_bus" && def.deleted === button.type}
            disableElevation
          >
            {button.txt}
          </Button>
        ))}
    </Box>
  );
};

export default FormsComponent;
