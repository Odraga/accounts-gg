import { FC } from "react";
import Modal, { ModalAction } from "../../../../components/Modal/Modal";
import { useFormik } from "formik";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";

import { FixedIncomeI } from "../../../../interface/db/FixedIncomeI";
import { db } from "../../../../db/db";

const validationSchema = yup.object({
  origin: yup.string().required("Campo requerido"),
  amount: yup
    .number()
    .required("Campo requerido")
    .min(0, "El monto no puede ser menor a 0"),
});

interface AddEditI {
  show: boolean;
  selected: FixedIncomeI | undefined;
  toggleModal: (value: boolean) => void;
}

const AddEdit: FC<AddEditI> = ({ show, selected, toggleModal }) => {
  const handleSubmit = async (obj: FixedIncomeI) => {
    try {
      obj.id = uuidv4();

      const id = selected
        ? await db.fixedIncome.update(selected.id, obj)
        : await db.fixedIncome.add(obj);

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
          origin: "",
          amount: 0,
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
                name="origin"
                type="text"
                placeholder="Origin"
                className="input input-bordered w-full max-w-xs"
                value={formik.values.origin}
                onChange={formik.handleChange}
              />
            </div>
            {formik.errors.origin ? (
              <div className="text-red-500 text-sm">{formik.errors.origin}</div>
            ) : null}
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
