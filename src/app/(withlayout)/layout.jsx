'use client'
import Contents from "@/components/ui/Contents";
import Sidebar from "@/components/ui/Sidebar";
import { isLoggedIn } from "@/service/auth.service";
import { Layout } from "antd";
import { useRouter } from "next/navigation";
import { useEffect , useState } from "react";
import Loading from "../Loading";



const DashboardLoayout = ({children}) => {
  const userLoggedIn = isLoggedIn()
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  useEffect(()=>{
   if (!userLoggedIn) {
     router.push("/login")
   }
   setIsLoading(false)
  },[router, isLoading, userLoggedIn])
  return isLoading ? <Loading /> : (
    <Layout hasSider>
     <Sidebar />
     <Contents>  {children} </Contents>
    </Layout>
  );
};

export default DashboardLoayout;