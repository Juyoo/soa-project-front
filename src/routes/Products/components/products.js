import React from 'react'
import {GridList, GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import Snackbar from 'material-ui/Snackbar'
import AddShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart'
import {green500 as green} from 'material-ui/styles/colors';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
}

export class Products extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      snackOpen: false,
      snackMessage: [],
      currentProduct: undefined
    }
  }

  openSnackbar = (product) => {
    this.setState({
      snackOpen: true,
      snackMessage: Object.assign([], this.state.snackMessage, '\'' + product.name + '\' added to Cart'),
      currentProduct: product
    })
  }

  closeSnackBar = () => {
    this.setState({
      snackOpen: false,
      snackMessage: this.state.snackMessage.splice(0, 1),
      currentProduct: undefined
    })
  }

  undoAddToCart = () => {
    this.closeSnackBar()
    this.props.onRemoveFromCart(this.state.currentProduct)
  }

  render = () => (
    <div className="row">
      <div className="col-xs-12">
        <Snackbar
          open={this.state.snackOpen}
          message={this.state.snackMessage}
          action="Annuler"
          onActionTouchTap={this.undoAddToCart}
          autoHideDuration={3000}
          onRequestClose={this.closeSnackBar}
        />

        <div style={styles.root}>
          <GridList
            cellHeight={180}
            style={styles.gridList}
            cols={3}
          >
            {this.props.products.map((product) => (
              <GridTile
                key={product.id}
                title={product.name}
                subtitle={<span>{product.price} €</span>}
                titleBackground="rgba(0, 0, 0, 0.6)"
                actionIcon={
                  <IconButton tooltip="Ajouter au panier" tooltipPosition="top-left">
                    <AddShoppingCart
                      color={green}
                      onTouchTap={() => {
                        this.props.onAddToCart(product)
                        this.openSnackbar(product)
                      }} />
                  </IconButton>
                }
              >
                <img src={product.image} />
              </GridTile>
            ))}
          </GridList>
        </div>

      </div>
    </div>
  )
}

export default Products
