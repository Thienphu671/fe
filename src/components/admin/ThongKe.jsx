import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
    fetchRevenueYears,
    fetchRevenueMonths,
    fetchRevenueDays,
    fetchTotalRevenue,
    fetchRevenueChart,
  } from "../../api/doanhthu";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const ThongKeDoanhThu = () => {
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [days, setDays] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [revenueChartData, setRevenueChartData] = useState(null);

  useEffect(() => {
    fetchRevenueYears().then((response) => {
      setYears(response.data);
    });
  }, []);

  useEffect(() => {
    if (selectedYear) {
      fetchRevenueMonths(selectedYear).then((res) => setMonths(res.data));
      fetchData();
    }
  }, [selectedYear]);

  useEffect(() => {
    if (selectedYear && selectedMonth) {
      fetchRevenueDays(selectedYear, selectedMonth).then((res) => setDays(res.data));
      fetchData();
    }
  }, [selectedMonth]);

  useEffect(() => {
    if (selectedYear && selectedMonth && selectedDay) {
      fetchData();
    }
  }, [selectedDay]);

  const fetchData = () => {
    fetchTotalRevenue(selectedYear, selectedMonth, selectedDay).then((res) =>
      setTotalRevenue(res.data)
    );

    fetchRevenueChart(selectedYear, selectedMonth, selectedDay).then((res) => {
      const data = res.data;
      if (Object.keys(data).length > 0) {
        const labels = Object.keys(data);
        const values = Object.values(data);
        setRevenueChartData({
          labels: labels,
          datasets: [
            {
              label: "Doanh thu (VNĐ)",
              data: values,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 2,
              pointBackgroundColor: "rgba(54, 162, 235, 1)",
              pointBorderColor: "#fff",
              pointRadius: 5,
              fill: true,
              tension: 0.3,
            },
          ],
        });
      } else {
        setRevenueChartData(null);
      }
    });
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    setSelectedMonth("");
    setSelectedDay("");
    setMonths([]);
    setDays([]);
    setRevenueChartData(null);
  };

  const handleMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);
    setSelectedDay("");
    setDays([]);
    setRevenueChartData(null);
  };

  const handleDayChange = (e) => {
const day = e.target.value;
    setSelectedDay(day);
    setRevenueChartData(null);
  };

  return (
    <div className="container mt-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">Thống kê</a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/admin/revenue/thongke">Doanh thu</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin/revenue/sanphamyeuthich">Sản phẩm yêu thích</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin/revenue/sanphambanchay">Sản phẩm bán chạy</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="row mt-3">
        <div className="col-md-4">
          <label>Năm</label>
          <select
            className="form-select"
            value={selectedYear}
            onChange={handleYearChange}
          >
            <option value="">Chọn năm</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label>Tháng</label>
          <select
            className="form-select"
            value={selectedMonth}
            onChange={handleMonthChange}
            disabled={!selectedYear}
          >
            <option value="">Chọn tháng</option>
            {months.map((month) => (
              <option key={month} value={month}>Tháng {month}</option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label>Ngày</label>
          <select
            className="form-select"
            value={selectedDay}
            onChange={handleDayChange}
            disabled={!selectedMonth}
          >
            <option value="">Chọn ngày</option>
            {days.map((day) => (
              <option key={day} value={day}>Ngày {day}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <h4>Tổng doanh thu: {totalRevenue.toLocaleString()} VNĐ</h4>
      </div>

      <div className="mt-4">
        {revenueChartData ? <Line data={revenueChartData} /> : <p>Không có dữ liệu biểu đồ.</p>}
      </div>
    </div>
  );
};

export default ThongKeDoanhThu;