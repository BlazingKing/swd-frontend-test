import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addPerson, editPerson, deletePerson, deleteMultiplePersons, setSelectedIds } from "@/store/slices/personSlice";
import { Person, PersonFormValues } from "@/types/person.types";
import { v4 as uuidv4 } from "uuid";
import { combineCitizenId } from "@/utils/validators";
import { Form } from "antd";
import dayjs from "dayjs";

export function usePersonForm() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const persons = useSelector((state: RootState) => state.person.persons);
  const selectedIds = useSelector((state: RootState) => state.person.selectedIds);

  const onFinish = (values: PersonFormValues & { id?: string } & Record<string, string>) => {
    const citizenId = combineCitizenId(values);
    const fullname = `${values.firstname} ${values.lastname}`;
    const birthday = values.birthday ? dayjs(values.birthday as unknown as string).format("YYYY-MM-DD") : "";

    const person: Person = {
      ...values,
      fullname,
      citizenId,
      birthday,
      id: values.id ?? uuidv4(),
    };

    if (values.id) {
      dispatch(editPerson(person));
    } else {
      dispatch(addPerson(person));
    }
    form.resetFields();
  };

  const handleEdit = (record: Person) => {
    form.setFieldsValue({
      ...record,
      birthday: record.birthday ? dayjs(record.birthday) : null,
    });
  };

  const handleDelete = (id: string) => dispatch(deletePerson(id));

  const handleDeleteMultiple = () => {
    dispatch(deleteMultiplePersons(selectedIds));
    dispatch(setSelectedIds([]));
  };

  const handleSelectAll = (checked: boolean) => {
    dispatch(setSelectedIds(checked ? persons.map((p) => p.id) : []));
  };

  const handleRowSelect = (keys: string[]) => {
    dispatch(setSelectedIds(keys));
  };

  return {
    form,
    persons,
    selectedIds,
    onFinish,
    handleEdit,
    handleDelete,
    handleDeleteMultiple,
    handleSelectAll,
    handleRowSelect,
  };
}
