"use client";

import React, { useState } from 'react';
import {
  TrendingUp,
  Search,
  ChevronDown,
  Menu,
  X,
  Bell,
  Settings,
  Package,
  Download,
  Calendar,
  BarChart2,
  PieChart as PieChartIcon, // Renamed to avoid conflict
  LineChart as LineChartIcon // Renamed to avoid conflict
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Button
} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, Legend, LineChart as RechartsLineChart, Line } from 'recharts';
import Sidebar from '../components/Sidebar'; // Assuming Sidebar component exists
import { SidebarTrigger } from '@/components/ui/sidebar';

const AnalyticsShadcn = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('Last 7 Days');

  // Sample data for charts (remains the same)
  const salesData = [
    { name: 'Mon', sales: 4000, revenue: 3000 },
    { name: 'Tue', sales: 3000, revenue: 2500 },
    { name: 'Wed', sales: 5000, revenue: 4200 },
    { name: 'Thu', sales: 4500, revenue: 3800 },
    { name: 'Fri', sales: 6000, revenue: 5100 },
    { name: 'Sat', sales: 5500, revenue: 4800 },
    { name: 'Sun', sales: 4800, revenue: 4200 }
  ];

  const categoryData = [
    { name: 'Smartphones', value: 45 },
    { name: 'Laptops', value: 25 },
    { name: 'Tablets', value: 15 },
    { name: 'Audio', value: 10 },
    { name: 'Wearables', value: 5 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const customerData = [
    { name: 'Jan', new: 400, returning: 240 },
    { name: 'Feb', new: 300, returning: 280 },
    { name: 'Mar', new: 500, returning: 320 },
    { name: 'Apr', new: 450, returning: 380 },
    { name: 'May', new: 600, returning: 410 },
    { name: 'Jun', new: 550, returning: 480 },
    { name: 'Jul', new: 480, returning: 520 }
  ];

  const chartConfig = {
    new: {
      label: "New",
      color: "hsl(var(--chart-1))", // Use Shadcn CSS variables
    },
    returning: {
      label: "Returning",
      color: "hsl(var(--chart-2))", // Use Shadcn CSS variables
    },
    sales: {
      label: "Sales",
      color: "hsl(var(--chart-1))",
    },
    revenue: {
      label: "Revenue",
      color: "hsl(var(--chart-2))",
    },
  }

  // Metric Card Data (Example - replace with dynamic data as needed)
  const metrics = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      changeDesc: "from last month",
      icon: BarChart2
    },
    {
      title: "Total Orders",
      value: "+356",
      change: "+12.3%",
      changeDesc: "from last month",
      icon: LineChartIcon
    },
    {
      title: "Conversion Rate",
      value: "+3.2%",
      change: "+0.8%",
      changeDesc: "from last month",
      icon: PieChartIcon
    },
    {
      title: "Avg. Order Value",
      value: "$127.00",
      change: "+7.2%",
      changeDesc: "from last month",
      icon: TrendingUp
    }
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* Main Content */}
      <div className="flex flex-col sm:gap-4 sm:py-4 transition-all duration-300 ease-in-out">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <SidebarTrigger />

          <h1 className="text-xl sm:text-2xl font-semibold text-foreground">Analytics</h1>
          <div className="ml-auto flex items-center gap-2 sm:gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{selectedPeriod}</span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSelectedPeriod('Last 7 Days')}>Last 7 Days</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedPeriod('Last 30 Days')}>Last 30 Days</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedPeriod('Last 90 Days')}>Last 90 Days</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedPeriod('Last Year')}>Last Year</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {/* Optional: Add notification indicator here */}
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </div>
        </header>

        {/* Analytics Content */}
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {/* Metrics Cards - Using Shadcn Card */}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:gap-8">
            {metrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                  <metric.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {metric.change} {metric.changeDesc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 lg:gap-8">
            {/* Sales & Revenue Chart - Using Shadcn Card & ChartContainer */}
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Sales & Revenue</CardTitle>
                <CardDescription>Daily performance for {selectedPeriod.toLowerCase()}</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <AreaChart
                    accessibilityLayer
                    data={salesData}
                    margin={{ left: 12, right: 12, top: 5, bottom: 5 }}
                  >
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                    <XAxis
                      dataKey="name"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.slice(0, 3)}
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="dot" hideLabel />}
                    />
                    <defs>
                      <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-sales)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="var(--color-sales)" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <Area
                      dataKey="sales"
                      type="natural"
                      fill="url(#fillSales)"
                      fillOpacity={0.4}
                      stroke="var(--color-sales)"
                      stackId="a"
                    />
                    <Area
                      dataKey="revenue"
                      type="natural"
                      fill="url(#fillRevenue)"
                      fillOpacity={0.4}
                      stroke="var(--color-revenue)"
                      stackId="b" // Use different stackId or none if not stacked
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
              <CardFooter>
                {/* Optional Footer Content */}
              </CardFooter>
            </Card>

            {/* Product Categories Chart - Using Shadcn Card & ChartContainer */}
            <Card className="lg:col-span-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Product Categories</CardTitle>
                  <CardDescription>Sales distribution by category</CardDescription>
                </div>
                <Button size="sm" variant="outline" className="h-8 gap-1">
                  <Download className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
                </Button>
              </CardHeader>
              <CardContent className="flex-1 pb-0">
                {/* Note: Shadcn ChartContainer doesn't directly support Pie charts well yet. */}
                {/* We'll use ResponsiveContainer directly here, styled within CardContent */}
                {/* For full Shadcn integration, consider a Bar chart or alternative viz */}
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: '12px' }} />
                      <Tooltip formatter={(value, name) => [`${value}%`, name]} contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="text-xs text-muted-foreground">
                Showing data for {selectedPeriod.toLowerCase()}
              </CardFooter>
            </Card>
          </div>

          {/* Customer Acquisition Chart - Already using Shadcn Card & ChartContainer */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Acquisition</CardTitle>
              <CardDescription>New vs returning customers ({selectedPeriod.toLowerCase()})</CardDescription>
            </CardHeader>
            <CardContent className="h-64 sm:h-80 pl-2">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <BarChart accessibilityLayer data={customerData} margin={{ left: 12, right: 12 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar dataKey="new" fill="var(--color-new)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="returning" fill="var(--color-returning)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 font-medium leading-none">
                Trending up by 12% <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing total customers in the last 6 months
              </div>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AnalyticsShadcn;

