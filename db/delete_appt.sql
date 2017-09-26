delete from
  appointments
where
  a_id = $1
and
  shop_id = $2