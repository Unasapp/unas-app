select
	c_first,
	c_last,
	c_phone,
	c_email
from
	clients
where
	c_shop = $1
