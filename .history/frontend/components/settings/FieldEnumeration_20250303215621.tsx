import React from 'react'

const FieldEnumeration = () => {
  return (
    <div>
      const FieldEnumration = ({
  name,
  value,
  form,
}: {
  name: string;
  value: string;
  form: any;
}) => {
  switch (name) {
    case "Account Name":
      return (
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          placeholder={value}
          className="max-h-[25px] w-32 overflow-hidden rounded-sm"
        />
      );
    case "occupation":
      return (
        <CustomFormField
        fieldType={FormFieldType.SELECT}
        control={form.control}
        name="occupation"
        placeholder={value}        
      >
        {medicalSpecialties.map((medicalValue, index) => (
          <SelectItem  key={index} value={medicalValue.specialty}>
            <div className="flex cursor-pointer justify-center items-center">
              <p className="text-md mx-2">{medicalValue.specialty}</p>
            </div>
          </SelectItem>
        ))}
      </CustomFormField>
      );
    default:
      return null;
  }
};
    </div>
  )
}

export default FieldEnumeration
