delete from
  clients
where
  c_first like $1
and
  c_shop = $2
