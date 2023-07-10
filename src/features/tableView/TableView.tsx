import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import Button from "@/components/Button";
import { Person, deletePerson, selectPerson } from "@/store/personSlice";
import Modal, { Action, Data } from "./components/modal/Modal";

interface Props {
  newID: number,
  setNewID: React.Dispatch<React.SetStateAction<number>>
}

export default function TableView({newID, setNewID}: Props) {
  const dispatch = useDispatch();
  const people: Person[] = useSelector(selectPerson);

  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState<Data>({ id: newID });
  const [action, setAction] = useState(Action.addPerson);

  const closeModal = () => setModalVisible(false);

  const openModal = (action: Action, data: Data) => {
    setAction(action);
    setModalVisible(true);
    setData(data);
  };

  const increaseNewIdByOne = () => {
    setNewID((prev) => prev + 1);
  };

  const deletePersonF = (id: number) => {
    dispatch(deletePerson({ id: id }));
  };

  return (
    <>
      <div className="container mx-auto mt-5">
        <div className="flex items-center justify-around">
          <h1 className="text-xl">People</h1>
          <Button onClick={() => openModal(Action.addPerson, { id: newID })}>
            Add
          </Button>
        </div>
        <div className="ml-20 mr-20 mt-2 relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Country
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {people.map((person) => (
                <tr key={person.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {person.id}
                  </th>
                  <td className="px-6 py-4">{person.name}</td>
                  <td className="px-6 py-4">{person.country}</td>
                  <td className="px-6 py-4">
                    <Button
                      color="bg-green-500 hover:bg-green-700 mr-4"
                      onClick={() =>
                        openModal(Action.editPerson, {
                          id: person.id,
                          name: person.name,
                          country: person.country,
                        })
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      color="bg-red-500 hover:bg-red-700"
                      onClick={() => deletePersonF(person.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {modalVisible && (
        <Modal
          closeModal={closeModal}
          action={action}
          increaeNewIdByOne={increaseNewIdByOne}
          data={data}
        />
      )}
    </>
  );
}
