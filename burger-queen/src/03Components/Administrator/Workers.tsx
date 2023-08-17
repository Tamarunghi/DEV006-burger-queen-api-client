import React, { useEffect, useState } from "react";
import addProfile from "../../04Images/addProfile.png";
import { GetUsers } from "../../02App/getUsers";

interface IWorkers {
    email: string,
      role: string,
      id: number,
}


export const Workers: React.FC <IWorkers> = ({
    email,
    role,
    id,
}) => {
      const [users, setUsers] = useState<any[]>([]);

    useEffect(()=>{
        GetUsers()
        .then((data)=>{
            setUsers(data)
        })
         .catch((error) => {
            console.error("Error fetching users", error);
    
        })
    })

    return (
    <main>
        {/* ---Add Profile --- */}
      <section id="addProfile" className="h-[20%] w-auto flex justify-center">
        <img src={addProfile} alt="addProfile" className="h-[100%]" />
      </section>
             {/* ---Profiles --- */}
      <section>


      </section>
    </main>
  );
};


