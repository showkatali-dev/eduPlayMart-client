import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";

const AllToys = () => {
  const loaderData = useLoaderData();
  const [allToys, setAllToys] = useState(loaderData.toys);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [numberOfToys, setNumberOfToys] = useState(loaderData.total);
  const [searchString, setSearchString] = useState("");
  const [sortBy, setSortBy] = useState("");
  const numberOfPage = Math.ceil(numberOfToys / limit);
  const [firstLoad, setFirstLoad] = useState(true);

  console.log(numberOfPage, numberOfToys, limit);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    setSearchString(searchText);
  };

  const handlePageChange = (page) => {
    fetch(
      `http://localhost:5000/api/toys?search=${searchString}&sort=${sortBy}&page=${page}&limit=${limit}`
    )
      .then((res) => res.json())
      .then((data) => {
        setAllToys(data.toys);
        setNumberOfToys(data.total);
        setPage(page);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (!firstLoad) {
      fetch(
        `http://localhost:5000/api/toys?search=${searchString}&sort=${sortBy}&limit=${limit}`
      )
        .then((res) => res.json())
        .then((data) => {
          setAllToys(data.toys);
          setNumberOfToys(data.total);
          setPage(1);
        })
        .catch((err) => console.error(err));
    }
    setFirstLoad(false);
  }, [firstLoad, limit, sortBy, searchString]);

  return (
    <>
      <Breadcrumb heading="All Toys">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>All Toys</li>
        </ul>
      </Breadcrumb>
      <div className="container mt-20 mb-16">
        <div className="my-6 bg-base-200 p-4 flex justify-center lg:justify-between gap-x-10 gap-y-6 flex-wrap">
          <form onSubmit={handleSearch} className="form-control">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search…"
                name="search"
                className="input focus:outline-none"
              />
              <button type="submit" className="btn btn-square btn-accent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </form>

          <div className="flex items-center gap-3 w-fit">
            <label htmlFor="page-count">Paginate by</label>
            <select
              id="page-count"
              defaultValue={limit}
              onChange={(e) => setLimit(e.target.value)}
              className="select w-24 focus:outline-none"
            >
              <option value={9}>9</option>
              <option value={12}>12</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>

          <div className="flex items-center gap-3 w-fit">
            <label htmlFor="sorting">Sort by</label>
            <select
              id="sorting"
              defaultValue={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="select w-fit focus:outline-none"
            >
              <option value="">Featured</option>
              <option value="price-ascending">Price, low to high</option>
              <option value="price-descending">Price, high to low</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto overflow-y-hidden">
          <table className="table w-full text-center">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th className="font-extrabold text-base">Seller</th>
                <th className="font-extrabold text-base">Toy Name</th>
                <th className="font-extrabold text-base">Subcategory</th>
                <th className="font-extrabold text-base">Price</th>
                <th className="font-extrabold text-base">Available Quantity</th>
                <th className="font-extrabold text-base"></th>
              </tr>
            </thead>
            <tbody>
              {/* rows */}
              {allToys.map((toy) => (
                <tr key={toy._id}>
                  <td></td>
                  <td>
                    <div className="font-semibold">{toy.sellerName}</div>
                  </td>
                  <td>
                    <div className="font-semibold">{toy.name}</div>
                  </td>
                  <td>{toy.subCategory}</td>
                  <td className="font-semibold">${toy.price}</td>
                  <td>{toy.availableQty}</td>
                  <th>
                    <Link
                      to={`/toy/${toy._id}`}
                      className="btn btn-primary btn-xs"
                    >
                      details
                    </Link>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {numberOfPage > 1 && (
          <div className="flex justify-center items-center gap-3 mt-6">
            <span>Page</span>
            <div className="btn-group">
              {[...Array(numberOfPage).keys()].map((p, index) => (
                <button
                  onClick={() => handlePageChange(index + 1)}
                  key={index}
                  className={`btn bg-base-200 border-base-200 ${
                    page === index + 1 ? "btn-active" : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AllToys;
