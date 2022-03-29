import React, { useContext, useEffect, useState } from "react";

const AppContext = React.createContext();
const key = process.env.REACT_APP_SPOON_KEY;

const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [calory, setCalory] = useState(2000);
  const [loading, SetLoading] = useState(false);

  const getMeals = async () => {
    SetLoading(true);
    try {
      const resp = await fetch(
        `https://api.spoonacular.com/mealplanner/generate?apiKey=${key}&timeFrame=day&targetCalories=${calory}`
      );
      const { meals, nutrients } = await resp.json();

      setMeals(meals);
      SetLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMeals();
  }, [calory]);

  return (
    <AppContext.Provider value={{ loading, meals, calory, setCalory }}>
      {children}
    </AppContext.Provider>
  );
};

//hook
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
