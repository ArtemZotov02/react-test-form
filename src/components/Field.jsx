import React from "react";
import { Controller } from "react-hook-form";

export default function Field({
  control,
  name,
  rules,
  placeholder,
  className,
}) {
  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <>
            <input
              placeholder={placeholder}
              name={name}
              value={value || ""}
              onChange={onChange}
              className={className}
            />
            {error && <p style={{ color: "red", fontSize:'12px' }}>{error.message}</p>}
          </>
        )}
      />
    </>
  );
}
