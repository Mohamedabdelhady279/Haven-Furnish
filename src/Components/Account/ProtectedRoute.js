import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({ children }) => {
  const userinfo = useSelector((state) => state.appReducer.userinfo);

  if (!userinfo) {
    // إذا لم يكن المستخدم مسجل دخول، يتم إعادة توجيهه إلى صفحة تسجيل الدخول
    return <Navigate to="/login" />;
  }

  // إذا كان المستخدم مسجل دخول، يتم السماح بالوصول إلى الصفحة
  return children;
};

export default ProtectedRoute;