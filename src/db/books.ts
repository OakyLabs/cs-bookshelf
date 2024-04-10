export type Book = {
  id: number;
  title: string;
  linkToAmazon: string;
  year: number;
  tags?: Array<never>;
  upvotes?: number;
  editions: number;
  authors: Array<Author>;
  image: string;
  isbn10: string;
};

export type Author = {
  id: number;
  name: string;
};

export const books: Array<Book> = [
  {
    id: 0,
    title:
      "Cracking the Coding Interview: 189 Programming Questions and Solutions (Cracking the Interview & Career)",
    editions: 6,
    year: 2015,
    linkToAmazon:
      "https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/0984782850?ref_=Oct_d_otopr_d_132570011_0&pd_rd_w=b2qJx&content-id=amzn1.sym.82286222-ea10-45f6-a8fc-bdaca92f4f32&pf_rd_p=82286222-ea10-45f6-a8fc-bdaca92f4f32&pf_rd_r=PADD7MJEVVTZEN4VR1DN&pd_rd_wg=Xn64e&pd_rd_r=1cf2e6d0-2b4d-4756-aeda-c3c981cf6f72&pd_rd_i=0984782850",
    tags: [],
    upvotes: 0,
    authors: [{ name: "Gayle Laakmann McDowell", id: 0 }],
    image: "https://m.media-amazon.com/images/I/61mIq2iJUXL._SL1360_.jpg",
    isbn10: "0984782869",
  },
  {
    title: "Compilers: Principles, Techniques, and Tools",
    year: 2006,
    upvotes: 0,
    editions: 2,
    linkToAmazon:
      "https://www.amazon.com/Compilers-Principles-Techniques-Tools-2nd/dp/0321486811/ref=sr_1_1?crid=36Z3FBWMKGE5V&dib=eyJ2IjoiMSJ9.OwajE0xuj8jByJLzsDikaZsl2Py1p_WrDG1NL4wN5RLvUfIDr04-YnAenUlNqG-ENuwknvPbLhS6fopON4YseWsFrYASeghKICTQNFA6trBxyv44BeWQCEZwtmXMHOliEownr1UgNNpF0sV1tLJCoYEk4XEQ5spGmCqFyWLwZ3RVa6DXnUIslvAzo-oZdL_6W_wtMKLWXXxPRwQuBmUlRT7h3sSf7zzh35PwjhPlbvM.t2MBELWEmelMn6XTFOl-mB_CGn_0S9i3x0DZlVsCD1E&dib_tag=se&keywords=Compilers%3A+Principles%2C+Techniques%2C+and+Tools&qid=1712764265&sprefix=compilers+principles%2C+techniques%2C+and+tools%2Caps%2C145&sr=8-1",
    authors: [
      { name: "Alfred Aho", id: 1 },
      { name: "Jeffrey Ullman", id: 2 },
      { name: "Ravi Sethi", id: 3 },
      { name: "Monica Lam", id: 4 },
    ],
    image: "https://m.media-amazon.com/images/I/81tyVdG-ETL._SL1500_.jpg",
    id: 1,
    isbn10: "0321486811",
  },

  {
    title:
      "Structure and Interpretation of Computer Programs - 2nd Edition (MIT Electrical Engineering and Computer Science)",
    year: 1996,
    editions: 2,
    linkToAmazon:
      "https://www.amazon.com/Structure-Interpretation-Computer-Programs-Engineering/dp/0262510871/ref=sr_1_1?dib=eyJ2IjoiMSJ9.yvDe9vTEM9IbNsPJnH-SMVGN64dO-tVt9DulVTG2VqFQM43rzJBjf8s7x5j0Ed3xtq8pWnnW6MMo1a04gMAvdhvKTLnOwxPBabI7IbGB9sdwd9QPRi2_xsGOl4CumLOe7Y4EJPpCZTmBmNDLvPA6ybnWZ-nFzofGusWIry56DKI-vNxRSdJQ_bdK1d-VxLlVWBixVBnTJA8h21VyRitODhqgAcKpI6vkV4FbrLReDGk.4S4s0tshiwkazYqx5GIgD0hiBVF7afGiQPCfeTQpET0&dib_tag=se&keywords=structure+and+interpretation&qid=1712764235&sr=8-1",
    tags: [],
    upvotes: 0,
    authors: [{ name: "Harold Abelson", id: 5 }],
    image: "https://m.media-amazon.com/images/I/71noXgc3kgL._SL1500_.jpg",
    id: 2,
    isbn10: "0262510871",
  },
  {
    title: "Introduction to Algorithms, fourth edition",
    year: 2022,
    editions: 4,
    linkToAmazon:
      "https://www.amazon.com/Introduction-Algorithms-fourth-Thomas-Cormen/dp/026204630X/ref=sr_1_1?crid=2RJ3FKVFO7RNX&dib=eyJ2IjoiMSJ9.dDPqDZSqkDgdnEPWAEei-MeQSxB6cv4wGQEoGtimEDXLJv-3o7TTqZkcpGQ55_C3ImX9Jr5lFHfupndmabWUFtuCa21RVCKnJa9KuP2q8YR8n0mXi-IPtpWVnQvnAwGL0xNsvUVd-Cp-sbhd8WUOdqGbLpm3JDV6Ctxd1jhlX-lnyQZvVIIZq1JgRJJ9QoNaPLHfOcWp1Gm8NMSz1YN5VylsmZhXQOaRE7GX8eknaBM.N4MbZF8xHsg5aE-9EqdCgBPdKYUhgILjUIzglpTUVxI&dib_tag=se&keywords=introduction+to+algorithms&qid=1712764242&sprefix=introduction+to+%2Caps%2C166&sr=8-1",
    tags: [],
    upvotes: 0,
    authors: [{ name: "Thomas H. Cormen", id: 6 }],
    image: "https://m.media-amazon.com/images/I/61Mw06x2XcL._SL1500_.jpg",
    id: 3,
    isbn10: "026204630X",
  },
  {
    authors: [{ name: "Gayle Laakmann McDowell", id: 0 }],
    title:
      "Cracking the Tech Career: Insider Advice on Landing a Job at Google, Microsoft, Apple, or any Top Tech Company",
    year: 2014,
    editions: 2,
    image: "https://m.media-amazon.com/images/I/61wyCWOdOmL._SL1360_.jpg",
    linkToAmazon:
      "https://www.amazon.com/Cracking-Tech-Career-Insider-Microsoft/dp/1118968085/ref=sr_1_1?crid=2ULQUXI8AEKA2&dib=eyJ2IjoiMSJ9.Es3tVXl3EXQ9ejVWk50Pr9_lG1k4CI9cqvRV2zbod00.1pF6wnLaw9FKFqIiht3Xmk7UFc42IUNYPaiGt0MappY&dib_tag=se&keywords=Cracking+the+Tech+Career%3A+Insider+Advice+on+Landing+a+Job+at+Google%2C+Microsoft%2C+Apple%2C+or+any+Top+Tech+Company&qid=1712771550&sprefix=cracking+the+tech+career+insider+advice+on+landing+a+job+at+google%2C+microsoft%2C+apple%2C+or+any+top+tech+company%2Caps%2C143&sr=8-1",
    tags: [],
    upvotes: 0,
    id: 4,
    isbn10: "1118968085",
  },
];

export async function getBooksOrdered() {
  return books.slice(0).sort((a, b) => {
    const aLength = a.upvotes ?? 0;
    const bLength = b.upvotes ?? 0;

    return bLength - aLength;
  });
}
