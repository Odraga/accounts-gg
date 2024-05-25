import { FC } from "react";
import Modal, { ModalAction } from "../../../../components/Modal/Modal";
import { useFormik } from "formik";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../../../db/db";
import { ExtraExpenseI } from "../../../../interface/db/ExtraExpenseI";

interface AddEditI {
  show: boolean;
  selected: ExtraExpenseI | undefined;
  toggleModal: (value: boolean) => void;
}

const validationSchema = yup.object({
  title: yup.string().required("Campo requerido"),
  description: yup.string().required("Campo requerido"),
  amount: yup
    .number()
    .required("Campo requerido")
    .min(0, "El monto no puede ser menor a 0"),
});

const AddEdit: FC<AddEditI> = ({ show, selected, toggleModal }) => {
  const handleSubmit = async (obj: ExtraExpenseI) => {
    try {
      console.log(obj);

      obj.id = uuidv4();
      obj.creationDate = new Date();

      const id = selected
        ? await db.extraExpense.update(selected.id, obj)
        : await db.extraExpense.add(obj);

      console.log(id);

      toggleModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: selected
      ? selected
      : {
          id: 0,
          title: "",
          description: "",
          amount: 0,
          creationDate: "",
        },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <Modal title="Add / Edit" show={show}>
      <form onSubmit={formik.handleSubmit}>
        <div className="container mt-4 flex justify-center">
          <div className="grid grid-rows-2">
            <div>
              <input
                name="title"
                type="text"
                placeholder="Title"
                className="input input-bordered w-full max-w-xs"
                value={formik.values.title}
                onChange={formik.handleChange}
              />
              {formik.errors.title ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.title}
                </div>
              ) : null}
            </div>

            <div className="mt-0">
              <textarea
                name="description"
                placeholder="Description"
                className="textarea textarea-bordered w-full max-w-xs"
                value={formik.values.description}
                onChange={formik.handleChange}
              ></textarea>

              {formik.errors.description ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.description}
                </div>
              ) : null}
            </div>
            <div className="mt-2">
              <input
                name="amount"
                type="number"
                placeholder="Amount"
                className="input input-bordered w-full max-w-xs"
                step="0.01"
                min={0}
                value={formik.values.amount}
                onChange={formik.handleChange}
              />
              {formik.errors.amount ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.amount}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <ModalAction hide={() => toggleModal(true)}>
          <button type="submit" className="btn btn-success text-white">
            Save
          </button>
        </ModalAction>
      </form>
    </Modal>
  );
};

export default AddEdit;
