import React, { FC } from "react";
import { confirmAlert } from "react-confirm-alert";
import { db } from "../../db/db";

interface DeleteConfirmI {}

const DeleteConfirm: FC<DeleteConfirmI> = () => {
  

    return confirmAlert({
          closeOnClickOutside: false,
          message: "Are you sure you want to delete this record?",
          buttons: [
            {
              label: "Yes",
              onClick: async () => {
                try {
                  await db.fixedExpense.delete(selected.id);
                } catch (error) {
                  console.error(error);
                }
              },
            },
            {
              label: "No",
            },
          ],
        });
  }
};

export default DeleteConfirm;
