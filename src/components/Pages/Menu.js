import React from "react";

import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { getRestaurant } from "../../graphql/queries";

// when using class components
import { withRouter } from "react-router";

import MenuHeader from "./MenuComponents/MenuHeader";
import MenuList from "./MenuComponents/MenuList";
import MenuDetail from "./MenuComponents/MenuDetail";
import CategoryList from "./MenuComponents/CategoryList";

class Menu extends React.Component {
  state = {
    isLoaded: false,
    rName: "",
    rLogo: null,
    categories: [],
    selectedCategory: "featured",
    items: [],
    selectedItem: null,
    show: false,
  };

  componentDidMount() {
    const params = this.props.match.params;
    this.fetchRestaurant(params);
  }

  fetchRestaurant = async (params) => {
    try {
      const response = await API.graphql({
        query: getRestaurant,
        variables: { id: params.restrantId }, // <- spelling. with this it fetches nothing (null)
        authMode: "API_KEY",
      });

      const rData = response.data.getRestaurant;

      var featuredItems0 = rData.categories.items.map((item) => item.items);
      var featuredItems1 = featuredItems0.map((item) => item.items);
      var featuredItems2 = featuredItems1.flat();
      var featuredItems3 = featuredItems2.filter(
        (item) => (item.featured = true)
      );

      var finalizedCategories = rData.categories.items.unshift({
        id: "featured",
        name: "Featured",
        items: featuredItems3,
      });

      this.setState({
        rName: rData.name,
        rLogo: rData.logo,
        categories: rData.categories,
        isLoaded: true,
      });
    } catch (err) {
      console.log("error fetching restaurants from menu:", err);
    }
  };

  onCategorySelect = (categoryId) => {
    this.setState({ selectedCategory: categoryId });
  };

  onItemSelect = (item) => {
    this.handleShow();
    this.setState({ selectedItem: item });

    console.log("from onItemSelect", this.state.selectedItem);
    console.log("end");
  };

  handleClose = () => {
    this.setState({ show: false });
  };
  handleShow = () => {
    this.setState({ show: true });
  };

  render() {
    console.log("rendering Menu.js");

    if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <MenuHeader rLogo={this.state.rLogo} rName={this.state.rName} />
          <CategoryList
            onCategorySelect={this.onCategorySelect}
            categories={this.state.categories}
            selectedCategory={this.state.selectedCategory}
          />
          <MenuList
            categories={this.state.categories}
            selectedCategory={this.state.selectedCategory}
            onItemSelect={this.onItemSelect}
          />
          <MenuDetail
            item={this.state.selectedItem}
            show={this.state.show}
            handleClose={this.handleClose}
          />
        </div>
      );
    }
  }
}

export default withRouter(Menu);
