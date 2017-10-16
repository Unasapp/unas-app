update
  appointments
set
  status = $3
where
  a_id = $1
and
  shop_id = $2
