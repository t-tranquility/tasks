const users = [
    { name: "Иван Иванов", age: 30, email: "ivanov@example.com", country: "Россия" },
    { name: "Мария Петрова", age: 25, email: "mariapetrova@example.com", country: "США" },
    { name: "Алексей Смирнов", age: 28, email: "alexsmirnov@example.com", country: "Россия" },
    { name: "Елена Козлова", age: 35, email: "elenakozlova@example.com", country: "Германия" },
    { name: "Дмитрий Иванов", age: 22, email: "dmitryivanov@example.com", country: "Россия" },
    { name: "Ольга Соколова", age: 40, email: "olgasokolova@example.com", country: "Франция" },
    { name: "Артем Петров", age: 27, email: "artempetrov@example.com", country: "Россия" },
    { name: "Наталья Кузнецова", age: 32, email: "natalyakuznetsova@example.com", country: "Италия" },
    { name: "Иван Смирнов", age: 29, email: "ivansmirnov@example.com", country: "Россия" },
    { name: "Екатерина Попова", age: 23, email: "ekaterinapopova@example.com", country: "Испания" },
    { name: "Сергей Новиков", age: 38, email: "sergeynovikov@example.com", country: "Россия" },
    { name: "Марина Иванова", age: 31, email: "marinaivanova@example.com", country: "Португалия" },
    { name: "Александр Сергеев", age: 26, email: "alexandersergeev@example.com", country: "Россия" },
    { name: "Анна Кузьмина", age: 33, email: "annakuzmina@example.com", country: "Греция" },
    { name: "Павел Федоров", age: 24, email: "pavelfedorov@example.com", country: "Россия" },
    { name: "Валентина Васнецова", age: 36, email: "valentinavasnetsova@example.com", country: "Австрия" },
    { name: "Никита Павлов", age: 28, email: "nikitapavlov@example.com", country: "Россия" },
    { name: "Юлия Морозова", age: 39, email: "yuliamorozova@example.com", country: "Нидерланды" },
    { name: "Григорий Козлов", age: 34, email: "grigorykozlov@example.com", country: "Россия" }
  ];
  //тут мы фильтруем по возрасту чтобы были не очень маленькими, но и не сильно большими
  //сложность O(n) тк я тут использую только filter, который только пробегает по каждому пользователю и проверяет удовлетворяет ли их возраст условиям фильтрации
  function ageFilter(users, minAge, maxAge) {
      return users.filter(({ age }) => age >= minAge && age <= maxAge); //тут у нас деструктуризация age
  }
  const ageFilterUsers = ageFilter(users, 25, 35);
  console.log('отфильтрованные юзеры', ageFilterUsers)
  
  
  //теперь тут группируем по странам чтобы кучковались вместе
  //тоже O(n), потому что функция использует метод reduce. он пробегает по пользователям и группирует их по странам, формируя уже новый объект с пользователями. тк доступ к свойствам объекта и добавление эдемента в массив происходтит за константное время, а проход осуществляется по всем юзерам, то это означает что общая сложность равна кол-ву юзеров
  function contryGroup(users) {
      return users.reduce((result, user) => {
           const { country } = user; 
  
          if (!result[country]) {
              result[country] = [];
          }
  
          result[country].push(user);
  
          return result;
      }, {});
  }
  
  const contryGroupUsers = contryGroup(users);
  console.log('сортировка юзеров по странам', contryGroupUsers);
  
  
  //сводка, но не криминальная, просто страна и сколько в ней юзеров и сколько им в среднем лет 
  //ощущение что тут O(2n) 
  function totalAmount(users) {
      return Object.entries(contryGroup(users)).reduce((statsByCountry, [country, usersInCountry]) => {
        
        const totalUsers = usersInCountry.length;
        const totalAge = usersInCountry.reduce((sum, { age }) => sum + age, 0); // тут деструктуризация age 
        const averageAge = totalAge / totalUsers;
  
          statsByCountry[country] = {
            totalUsers,
            averageAge,
            names: usersInCountry.map(({ name }) => name) // а тут помимо деструктуризации добавила и map, потому что оно в условии было, но до этого не могла найти ему применение 
          };
  
        return statsByCountry;
      }, {});
  }
  
  const countryStats =  totalAmount(users);
  console.log('Сводные данные по странам и среднему возрасту', countryStats);