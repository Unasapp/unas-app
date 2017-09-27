insert into
	clients
	(c_first, c_last, c_phone, c_email, b_day, c_shop)
values
	($1, $2, $3, $4, $5, $6)
returning *
