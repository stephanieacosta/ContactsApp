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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (page: 1 | 2) => {
      setLoading(true); // Loading en true antes del fetching data
      try {
        const response = await fetch(
          `https://reqres.in/api/users?page=${page}`
        );
        const { data } = await response.json();
        return data;
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false); // Loading en falso independientemente del éxito o fallo
      }
    };

    const getData = async () => {
      setLoading(true); // Loading en true antes del fetching data
      try {
        const promises = [fetchData(1), fetchData(2)];
        const settle = await Promise.allSettled(promises);

        for (const result of settle) {
          if (result.status === "fulfilled") {
            console.log({ data: result.value });
            setContacts((prev) => [...prev, ...result.value]);
          }
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false); // Loading en falso cuando toda la data está recibida o si ocurre un error
      }
    };

    getData();
  }, []);

  return { contacts, loading }; // Retornar el estado de contacts y loading
};
