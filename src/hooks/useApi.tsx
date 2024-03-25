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
      setLoading(true); // Set loading to true before fetching data
      try {
        const response = await fetch(
          `https://reqres.in/api/users?page=${page}`
        );
        const { data } = await response.json();
        return data;
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    const getData = async () => {
      setLoading(true); // Set loading to true before fetching data
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
        setLoading(false); // Set loading to false once all data is fetched or if an error occurs
      }
    };

    getData();
  }, []);

  return { contacts, loading }; // Return loading state along with contacts
};
