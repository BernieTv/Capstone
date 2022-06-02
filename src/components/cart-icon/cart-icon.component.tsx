import { useDispatch, useSelector } from 'react-redux';

import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

import { ShoppingIcon, CartItemsContainer, ItemCount } from './cart-icon.styles';

const CartIcon = () => {
	const dispatch = useDispatch();

	const cartCount = useSelector(selectCartCount);
	const isCartOpen = useSelector(selectIsCartOpen);

	const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

	return (
		<CartItemsContainer onClick={toggleIsCartOpen}>
			<ShoppingIcon />
			<ItemCount>{cartCount}</ItemCount>
		</CartItemsContainer>
	);
};

export default CartIcon;
