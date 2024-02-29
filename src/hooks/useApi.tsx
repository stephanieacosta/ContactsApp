import { useEffect, useState } from "react";

interface IContact {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

export const useApi = () => {
  const [contacts, setContacts] = useState<IContact[]>([]);

  useEffect(() => {
    const fetchData = async (page: 1 | 2) => {
      const response = await fetch(`https://reqres.in/api/users?page=${page}`);
      const { data } = await response.json();
      return data;
    };

    const getData = async () => {
      const promises = [fetchData(1), fetchData(2)];
      const settle = await Promise.allSettled(promises);

      for (const result of settle) {
        if (result.status === "fulfilled") {
          console.log({ data: result.value });
          setContacts((prev) => [...prev, ...result.value]);
        }
      }
    };

    getData();
  }, []);

  return { contacts };
};
