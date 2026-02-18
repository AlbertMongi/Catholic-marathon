import React, { useState } from "react";

import { allProducts } from "@/lib/db/store.data";
import StoreHero from "@/components/store/StoreHero";
import StoreSearchFilter from "@/components/store/StoreSearchFilter";
import StoreProductGrid from "@/components/store/StoreProductGrid";
import StoreFeaturedCollections from "@/components/store/StoreFeaturedCollections";
import StoreBestsellers from "@/components/store/StoreBestsellers";
import StoreNewArrivalsBanner from "@/components/store/StoreNewArrivalsBanner";
import StorePurchaseInfo from "@/components/store/StorePurchaseInfo";

const StorePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <StoreHero />

      <StoreSearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />

      <StoreProductGrid filteredProducts={filteredProducts} />

      <StoreFeaturedCollections />

      <StoreBestsellers />

      <StoreNewArrivalsBanner />

      <StorePurchaseInfo />
    </>
  );
};

export default StorePage;
