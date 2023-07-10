import { FormEvent, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import countryList from "react-select-country-list";
import Select from "react-select";

import Button from "@/components/Button";
import { Person, addPerson, editPerson } from "@/store/personSlice";

import "./Modal.css";

export enum Action {
  addPerson = "Add",
  editPerson = "Edit",
}

export type Data = {
  id: number;
  name?: string;
  country?: string;
};

interface Props {
  closeModal: () => void;
  increaeNewIdByOne?: () => void;
  action: Action;
  data: Data;
}

export default function Modal(props: Props) {
  const dispatch = useDispatch();

  const [name, setName] = useState(props.data.name ?? "");
  const [country, setCountry] = useState(props.data.country ?? "");

  const closeModal = props.closeModal;
  const increaseNewIdByOne = props.increaeNewIdByOne;
  const actionName = props.action;
  const id = props.data.id;

  const countryOptions: any[] = useMemo(() => countryList().getData(), []);

  const addPersonF = (person: Person) => {
    dispatch(addPerson(person));
  };

  const editPersonF = (person: Person) => {
    dispatch(editPerson(person));
  };

  const action = () => {
    switch (actionName) {
      case Action.addPerson:
        if (name == "" || country == "") return;
        addPersonF({ id: id, name: name, country: country });
        if (increaseNewIdByOne) increaseNewIdByOne();
        return;
      case Action.editPerson:
        if (name == "" || country == "") return;
        editPersonF({ id: id, name: name, country: country });
        return;
      default:
        return;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    action();
    closeModal();
  };

  return (
    <>
      <div className="fixed top-0 left-0 whole-screen">
        <div className="center-window">
          <div className="bg-white rounded">
            <div className="flex justify-end">
              <div className="m-1">
                <Button
                  color="bg-red-500 hover:bg-red-700"
                  onClick={closeModal}
                >
                  X
                </Button>
              </div>
            </div>

            <form className="p-10 pt-2" onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="country"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Country
                </label>
                <Select
                  options={countryOptions}
                  value={{
                    value: countryList().getValue(country),
                    label: country,
                  }}
                  onChange={(selectedOption: any) =>
                    setCountry(selectedOption.label)
                  }
                  required
                />
              </div>
              <Button onClick={() => {}}>{actionName}</Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
