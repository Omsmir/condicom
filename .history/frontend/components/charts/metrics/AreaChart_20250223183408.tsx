"use client"
import {AreaChart, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

import React from 'react'

const Component = () => {
  const data = [
    {
      name:"omar"
    }
  ]
  return (
    <ResponsiveContainer width="100%" height={300}>
    <AreaChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
    </AreaChart>
  </ResponsiveContainer>
  )
}

export default Component
