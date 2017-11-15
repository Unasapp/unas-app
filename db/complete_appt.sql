update
  appointments
set
  tip = $2,
  total = $3,
  service_id2 = $4,
  service_id3 = $5,
  service_id4 = $12,
  service_id5 = $13,
  product_id = $6,
  qty = $7,
  product_id2 = $8,
  qty2 = $9,
  pay_mth = $10,
  status = $11
where 
    a_id = $1;
update
	products
set
	quantity = (quantity - $7)
where
	p_id = $6;
update
	products
set
	quantity = (quantity - $9)
where
	p_id = $8;


