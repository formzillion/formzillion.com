import { startCase } from "lodash";

import Modal, { ModalTitle } from "@/components/Modal";
import Button from "@/ui/Buttons";
import { Form, InputField, SelectField } from "@/ui/fields";

const AddCustomizeField = ({
  showModal,
  handleShowModal,
  formMethods,
  setFieldType,
  handleSubmit,
  fieldType,
}: any) => {
  const customFields = ["text", "email", "textArea", "select"];
  return (
    <Modal isOpen={showModal} toggle={() => handleShowModal()}>
      <ModalTitle title="Add Custom Field" toggle={() => handleShowModal()} />
      <div className="p-5 dark:text-gray-400">
        <Form
          form={formMethods}
          handleSubmit={(d) => handleSubmit(d)}
          className="space-y-6"
        >
          <div>
            <InputField
              label="Name of field"
              {...formMethods.register("name")}
              id={"name"}
              type={"text"}
            />
          </div>
          <div>
            <SelectField
              label="Select Type of field"
              options={customFields.map((field) => ({
                value: field,
                label: startCase(field),
              }))}
              {...formMethods.register("type")}
              id={"type"}
              onChange={(e: any) => {
                setFieldType(e.target.value);
              }}
            />
          </div>
          {fieldType === "select" && (
            <div>
              <InputField
                label="Enter values for select droup down seperated by comma"
                {...formMethods.register("selectOptions")}
                id={"selectOptions"}
                type={"text"}
              />
            </div>
          )}
          <Button type="submit">Add Feld</Button>
        </Form>
      </div>
    </Modal>
  );
};

export default AddCustomizeField;
