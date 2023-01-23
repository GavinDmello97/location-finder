import { LatLngBoundsExpression, LatLngExpression, LatLngTuple } from "leaflet";
import { useState } from "react";
import {
  MapContainer,
  Marker,
  Polygon,
  Popup,
  TileLayer,
  FeatureGroupProps,
  useMap,
} from "react-leaflet";

const defaultCoordinates = [
  [-71.1912442, 42.2829427],
  [-71.1912305, 42.2826527],
  [-71.1911314, 42.2823645],
  [-71.1909746, 42.2821242],
  [-71.1907534, 42.281841],
  [-71.1905101, 42.2816484],
  [-71.1902524, 42.2814984],
  [-71.1899303, 42.2812897],
  [-71.1895291, 42.2811179],
  [-71.189085, 42.2809087],
  [-71.1886624, 42.2806996],
  [-71.188426, 42.280571],
  [-71.1881988, 42.2804552],
  [-71.1878086, 42.2802645],
  [-71.1870601, 42.2800348],
  [-71.1859905, 42.2797716],
  [-71.1855114, 42.2796821],
  [-71.1854239, 42.2796414],
  [-71.1853578, 42.2795912],
  [-71.1853166, 42.2795204],
  [-71.1852878, 42.2794576],
  [-71.184681, 42.2784223],
  [-71.1832575, 42.2759935],
  [-71.1831597, 42.2759133],
  [-71.1830477, 42.2758534],
  [-71.1828953, 42.275853],
  [-71.1827797, 42.2758797],
  [-71.1824952, 42.2759655],
  [-71.1812417, 42.2762057],
  [-71.1804069, 42.2763702],
  [-71.1797648, 42.2764875],
  [-71.1791388, 42.2765989],
  [-71.1785528, 42.2767103],
  [-71.1774614, 42.2768681],
  [-71.1771087, 42.2768592],
  [-71.1769243, 42.2768369],
  [-71.1767813, 42.2767988],
  [-71.176364, 42.2766447],
  [-71.1759318, 42.2764648],
  [-71.1754438, 42.2762431],
  [-71.174972, 42.2760035],
  [-71.1747643, 42.2758421],
  [-71.174605, 42.2756631],
  [-71.1745096, 42.2754722],
  [-71.1744383, 42.2752993],
  [-71.1744157, 42.2750492],
  [-71.1745131, 42.2747814],
  [-71.1746105, 42.2745792],
  [-71.1747721, 42.2743296],
  [-71.1748533, 42.2741393],
  [-71.17487, 42.2740023],
  [-71.1748867, 42.2738714],
  [-71.1748634, 42.2737344],
  [-71.1747848, 42.2734066],
  [-71.1746025, 42.2730011],
  [-71.1743274, 42.2726167],
  [-71.1740402, 42.2722658],
  [-71.1738588, 42.2719866],
  [-71.1737064, 42.2716933],
  [-71.1735827, 42.2714142],
  [-71.1735266, 42.2711139],
  [-71.1734121, 42.2709135],
  [-71.1731536, 42.2706698],
  [-71.1729913, 42.2704335],
  [-71.1729534, 42.2702975],
  [-71.172964, 42.2701333],
  [-71.1730222, 42.2700262],
  [-71.1732159, 42.2697767],
  [-71.1736221, 42.2693705],
  [-71.1739409, 42.2691213],
  [-71.1743079, 42.2688579],
  [-71.1745014, 42.2686512],
  [-71.1746086, 42.2683727],
  [-71.1746005, 42.268087],
  [-71.1745824, 42.2678511],
  [-71.174526, 42.2676079],
  [-71.1744407, 42.2673433],
  [-71.1743166, 42.2671786],
  [-71.1741537, 42.2670209],
  [-71.1739044, 42.2668773],
  [-71.1736068, 42.2667478],
  [-71.1731552, 42.2666179],
  [-71.1727949, 42.2665443],
  [-71.1723861, 42.2665085],
  [-71.1720785, 42.2664433],
  [-71.1718673, 42.2663712],
  [-71.1716946, 42.2662779],
  [-71.1715413, 42.2661416],
  [-71.171379, 42.2659053],
  [-71.1713232, 42.2656914],
  [-71.1713242, 42.2653478],
  [-71.1689491, 42.2634342],
  [-71.1648574, 42.2601814],
  [-71.1634768, 42.2590898],
  [-71.1634, 42.2590278],
  [-71.1585935, 42.2551482],
  [-71.1559624, 42.2564837],
  [-71.1523124, 42.2583363],
  [-71.1466427, 42.2557559],
  [-71.1461357, 42.2530113],
  [-71.1455972, 42.2500965],
  [-71.1445792, 42.2453173],
  [-71.1445428, 42.2451455],
  [-71.1426766, 42.235979],
  [-71.1392577, 42.2336666],
  [-71.130749, 42.2279112],
  [-71.1305255, 42.2280899],
  [-71.1303469, 42.2283163],
  [-71.1302661, 42.2285043],
  [-71.1301913, 42.2285953],
  [-71.1301008, 42.2286678],
  [-71.1299556, 42.2287313],
  [-71.1296735, 42.2287536],
  [-71.1294856, 42.2287821],
  [-71.1293558, 42.2288545],
  [-71.1292025, 42.2289675],
  [-71.1290683, 42.2291387],
  [-71.1289538, 42.2293158],
  [-71.1289057, 42.2295106],
  [-71.1288892, 42.2296473],
  [-71.1288636, 42.2297205],
  [-71.1288298, 42.2297693],
  [-71.1287751, 42.229819],
  [-71.1285231, 42.2299866],
  [-71.1283815, 42.2300793],
  [-71.1282518, 42.2301836],
  [-71.1280784, 42.2303722],
  [-71.1279618, 42.2305442],
  [-71.1277549, 42.2307814],
  [-71.1276323, 42.230976],
  [-71.1275296, 42.2311153],
  [-71.1274198, 42.2311761],
  [-71.1272199, 42.2312074],
  [-71.1269966, 42.2312271],
  [-71.1267813, 42.2312264],
  [-71.1266088, 42.2312637],
  [-71.1263889, 42.2313706],
  [-71.1262394, 42.231501],
  [-71.1261642, 42.2316347],
  [-71.1260498, 42.2317565],
  [-71.1259516, 42.2318173],
  [-71.1258142, 42.2318692],
  [-71.1256067, 42.2318773],
  [-71.1254774, 42.2318826],
  [-71.1253518, 42.2319375],
  [-71.1252297, 42.2320566],
  [-71.1251191, 42.2322307],
  [-71.1250636, 42.2323585],
  [-71.1249729, 42.2324688],
  [-71.1248808, 42.2325399],
  [-71.1247448, 42.2326223],
  [-71.1245834, 42.2327788],
  [-71.124524, 42.2329038],
  [-71.1245031, 42.2330929],
  [-71.1245106, 42.2331569],
  [-71.1245299, 42.2332181],
  [-71.1246079, 42.2333111],
  [-71.1246617, 42.2335054],
  [-71.1247153, 42.2336406],
  [-71.1247186, 42.2337454],
  [-71.1246789, 42.2338413],
  [-71.1245878, 42.2340126],
  [-71.1245172, 42.2341059],
  [-71.1244616, 42.2341606],
  [-71.1243964, 42.2342027],
  [-71.1242338, 42.234285],
  [-71.1240533, 42.2343222],
  [-71.1238106, 42.2343214],
  [-71.1236072, 42.2342888],
  [-71.1233765, 42.2342531],
  [-71.1231103, 42.2342319],
  [-71.1229379, 42.2342487],
  [-71.1227378, 42.234315],
  [-71.1226395, 42.2343758],
  [-71.122604, 42.2344368],
  [-71.1225999, 42.2345989],
  [-71.1225988, 42.2346434],
  [-71.1225661, 42.234766],
  [-71.1224841, 42.2348467],
  [-71.1224639, 42.234931],
  [-71.122475, 42.2350503],
  [-71.1225172, 42.2351989],
  [-71.1226183, 42.2353098],
  [-71.1226377, 42.2353797],
  [-71.1226726, 42.2354061],
  [-71.1227547, 42.2354237],
  [-71.1229653, 42.2355758],
  [-71.1232695, 42.2357775],
  [-71.1233395, 42.2358534],
  [-71.1234781, 42.2359258],
  [-71.1236711, 42.2360786],
  [-71.1240843, 42.2363884],
  [-71.1242359, 42.236546],
  [-71.1244573, 42.236861],
  [-71.1245457, 42.2371494],
  [-71.1246116, 42.2372601],
  [-71.1246894, 42.2373651],
  [-71.1247634, 42.2374294],
  [-71.1248531, 42.2374763],
  [-71.1253805, 42.2376788],
  [-71.1255405, 42.2377811],
  [-71.1256253, 42.237855],
  [-71.1256808, 42.2379009],
  [-71.1257001, 42.2379562],
  [-71.125769, 42.2382009],
  [-71.1258736, 42.2384078],
  [-71.1259509, 42.2385652],
  [-71.1260245, 42.2386993],
  [-71.1260788, 42.2387955],
  [-71.1261689, 42.2389045],
  [-71.1262961, 42.2390632],
  [-71.1263811, 42.2391652],
  [-71.1259311, 42.2393894],
  [-71.1165248, 42.2442679],
  [-71.1145532, 42.2452905],
  [-71.1093474, 42.2479902],
  [-71.109458, 42.2521143],
  [-71.1094661, 42.2524163],
  [-71.1095445, 42.2554123],
  [-71.1130777, 42.258754],
  [-71.1131499, 42.2588239],
  [-71.1133253, 42.25899],
  [-71.113277, 42.2590315],
  [-71.1130059, 42.2592559],
  [-71.1127588, 42.2594576],
  [-71.1125616, 42.2596199],
  [-71.1123542, 42.2598389],
  [-71.1121452, 42.2600407],
  [-71.111867, 42.2604101],
  [-71.1116596, 42.2606317],
  [-71.111461, 42.2607693],
  [-71.1111011, 42.2609162],
  [-71.1107545, 42.261041],
  [-71.1104648, 42.2611239],
  [-71.1102669, 42.2611356],
  [-71.1099811, 42.2611421],
  [-71.1096817, 42.2611731],
  [-71.1093255, 42.2612583],
  [-71.1091508, 42.2612948],
  [-71.1089547, 42.2612966],
  [-71.1086823, 42.2612636],
  [-71.1084734, 42.261174],
  [-71.1083378, 42.2610599],
  [-71.1081262, 42.2608814],
  [-71.1078411, 42.2607497],
  [-71.1075855, 42.2606795],
  [-71.1073164, 42.2606687],
  [-71.1069123, 42.2606871],
  [-71.1061372, 42.2607932],
  [-71.1055416, 42.2608726],
  [-71.1052609, 42.2608568],
  [-71.105002, 42.260804],
  [-71.1047568, 42.2606649],
  [-71.1045419, 42.2604691],
  [-71.1043774, 42.2602043],
  [-71.1041893, 42.2599864],
  [-71.1040621, 42.2598625],
  [-71.1038235, 42.2597357],
  [-71.1033185, 42.259692],
  [-71.1027994, 42.2597915],
  [-71.1024325, 42.2599779],
  [-71.1021553, 42.2601917],
  [-71.1018532, 42.2603784],
  [-71.1014864, 42.2605697],
  [-71.1010559, 42.2608422],
  [-71.100732, 42.2610708],
  [-71.100236, 42.2614321],
  [-71.0998018, 42.2617688],
  [-71.0995713, 42.2619557],
  [-71.0991182, 42.2623739],
  [-71.0988642, 42.2625903],
  [-71.0985043, 42.2627248],
  [-71.0982064, 42.2627806],
  [-71.0978015, 42.262912],
  [-71.0977401, 42.262932],
  [-71.0974831, 42.2630891],
  [-71.0972182, 42.2634636],
  [-71.0969206, 42.2639836],
  [-71.0967521, 42.2643386],
  [-71.0964321, 42.2647374],
  [-71.0961645, 42.2650056],
  [-71.0958537, 42.2652317],
  [-71.0955684, 42.2654258],
  [-71.0953542, 42.2656299],
  [-71.0951198, 42.2659205],
  [-71.0949921, 42.2661151],
  [-71.0947322, 42.2665044],
  [-71.0945938, 42.2667928],
  [-71.0943847, 42.266992],
  [-71.0941313, 42.2671319],
  [-71.0938984, 42.2671409],
  [-71.093636, 42.2671129],
  [-71.0934102, 42.2670825],
  [-71.0931248, 42.2670001],
  [-71.092943, 42.2668462],
  [-71.0927374, 42.2667467],
  [-71.0926263, 42.266729],
  [-71.0923004, 42.2667328],
  [-71.0918021, 42.2666792],
  [-71.0913238, 42.266596],
  [-71.0910236, 42.2665085],
  [-71.0908177, 42.2664805],
  [-71.0904981, 42.2665511],
  [-71.0902147, 42.2666538],
  [-71.0900995, 42.2667423],
  [-71.0899885, 42.2674727],
  [-71.0898585, 42.267776],
  [-71.0898567, 42.2680526],
  [-71.0899673, 42.2684159],
  [-71.0901525, 42.268829],
  [-71.0902113, 42.2689848],
  [-71.0901908, 42.269076],
  [-71.090038, 42.2693224],
  [-71.0898204, 42.269539],
  [-71.0894571, 42.2696883],
  [-71.089051, 42.2697658],
  [-71.0886505, 42.2697496],
  [-71.0881656, 42.2696614],
  [-71.0876313, 42.2695236],
  [-71.0869773, 42.2693781],
  [-71.0861722, 42.269222],
  [-71.0853953, 42.269044],
  [-71.0842415, 42.2688275],
  [-71.0833812, 42.2686885],
  [-71.0829793, 42.2686535],
  [-71.0827616, 42.2686345],
  [-71.0826147, 42.2686426],
  [-71.0824618, 42.2686753],
  [-71.0815127, 42.2690248],
  [-71.0808524, 42.2693217],
  [-71.0803209, 42.2694471],
  [-71.0798579, 42.2694722],
  [-71.0793858, 42.2695071],
  [-71.079136, 42.2695357],
  [-71.0788642, 42.2695801],
  [-71.0787153, 42.269637],
  [-71.0784054, 42.2697533],
  [-71.0781584, 42.2698919],
  [-71.0778459, 42.2700176],
  [-71.0775777, 42.2701544],
  [-71.0771084, 42.2703828],
  [-71.0768558, 42.2704549],
  [-71.0764918, 42.2705087],
  [-71.0760537, 42.2705237],
  [-71.0756311, 42.2704614],
  [-71.0752462, 42.2703001],
  [-71.0748308, 42.2702545],
  [-71.0739328, 42.2702567],
  [-71.0731978, 42.270287],
  [-71.0729152, 42.2703686],
  [-71.0727138, 42.2705278],
  [-71.0724306, 42.2706866],
  [-71.0720438, 42.2708174],
  [-71.0716798, 42.2708547],
  [-71.071346, 42.2708369],
  [-71.0712051, 42.2708033],
  [-71.0710498, 42.2707366],
  [-71.0708123, 42.2706561],
  [-71.0705681, 42.2706301],
  [-71.0701601, 42.2705899],
  [-71.0694102, 42.2706201],
  [-71.0688906, 42.2707079],
  [-71.0683593, 42.2708155],
  [-71.0681094, 42.2709298],
  [-71.0680509, 42.2709566],
  [-71.0679221, 42.2711657],
  [-71.0678241, 42.271386],
  [-71.0677045, 42.2714903],
  [-71.0675225, 42.2715058],
  [-71.0672818, 42.2714501],
  [-71.0669555, 42.2714046],
  [-71.0664142, 42.2713201],
  [-71.0660361, 42.271269],
  [-71.0657693, 42.2712018],
  [-71.065459, 42.2710077],
  [-71.0650976, 42.2706591],
  [-71.0649051, 42.2703913],
  [-71.0647819, 42.2701672],
  [-71.0647471, 42.2699555],
  [-71.0648248, 42.2697406],
  [-71.0650093, 42.2694846],
  [-71.0650328, 42.2692861],
  [-71.0649369, 42.2689707],
  [-71.0646954, 42.2686072],
  [-71.0641038, 42.2681178],
  [-71.0635129, 42.2675604],
  [-71.0631025, 42.2673437],
  [-71.0626002, 42.2672057],
  [-71.0621886, 42.267159],
  [-71.0618283, 42.2672078],
  [-71.0609787, 42.2674536],
  [-71.0589143, 42.2686418],
  [-71.0566011, 42.2700603],
  [-71.0554106, 42.2707163],
  [-71.0543343, 42.2713657],
  [-71.0538362, 42.2716985],
  [-71.0536905, 42.2718164],
  [-71.0536055, 42.2719534],
  [-71.0534892, 42.2722461],
  [-71.0535014, 42.2726767],
  [-71.0537124, 42.2730513],
  [-71.0541064, 42.2734267],
  [-71.054986, 42.274155],
  [-71.0553488, 42.274621],
  [-71.0555746, 42.2750524],
  [-71.0555853, 42.2757095],
  [-71.0552452, 42.2763426],
  [-71.0544014, 42.2770191],
  [-71.0539116, 42.2772665],
  [-71.0532843, 42.2775018],
  [-71.0525967, 42.2776692],
  [-71.0512829, 42.2779246],
  [-71.0498019, 42.2781001],
  [-71.0492377, 42.2780639],
  [-71.0485829, 42.277914],
  [-71.0476862, 42.2774234],
  [-71.0467293, 42.2768531],
  [-71.0458135, 42.2763846],
  [-71.0453756, 42.2762814],
  [-71.0448326, 42.2762652],
  [-71.0443381, 42.2763226],
  [-71.043904, 42.2764547],
  [-71.0431639, 42.2768013],
  [-71.0427823, 42.2771023],
  [-71.041587, 42.2779529],
  [-71.0414067, 42.2781105],
  [-71.0412088, 42.2783221],
  [-71.0410412, 42.2785304],
  [-71.0409049, 42.278751],
  [-71.0407518, 42.2790113],
  [-71.0406514, 42.279282],
  [-71.0405831, 42.2795507],
  [-71.0405377, 42.2798475],
  [-71.0403897, 42.2816609],
  [-71.0403518, 42.2819314],
  [-71.0402998, 42.2822513],
  [-71.0402132, 42.2826111],
  [-71.040096, 42.2829696],
  [-71.0399876, 42.2832494],
  [-71.0398913, 42.2834796],
  [-71.0397784, 42.2836814],
  [-71.0396395, 42.2838803],
  [-71.0394866, 42.2840497],
  [-71.0388294, 42.2846786],
  [-71.0385282, 42.2849328],
  [-71.0365471, 42.2864209],
  [-71.0355762, 42.2877004],
  [-71.0353455, 42.2894052],
  [-71.0358605, 42.2912782],
  [-71.0372767, 42.2932941],
  [-71.0411391, 42.2993888],
  [-71.0414609, 42.3011504],
  [-71.0416835, 42.3053206],
  [-71.0284784, 42.3088593],
  [-71.0220829, 42.3055578],
  [-71.0158431, 42.3070178],
  [-71.0098757, 42.3053341],
  [-71.0052648, 42.3073348],
  [-71.0020694, 42.3088268],
  [-70.9987756, 42.3121877],
  [-70.9887721, 42.3138078],
  [-70.9819941, 42.3086253],
  [-70.9756083, 42.3001207],
  [-70.9604807, 42.2996605],
  [-70.9491017, 42.3012206],
  [-70.9375145, 42.3110277],
  [-70.9273071, 42.310101],
  [-70.921686, 42.3122501],
  [-70.9173039, 42.3140679],
  [-70.9156352, 42.3146344],
  [-70.9137046, 42.3152036],
  [-70.900426, 42.3185079],
  [-70.8867674, 42.3191999],
  [-70.8057212, 42.3350814],
  [-70.8044881, 42.3458326],
  [-70.8147699, 42.3751155],
  [-70.8203261, 42.3909274],
  [-70.8744911, 42.380596],
  [-70.9031904, 42.3751097],
  [-70.9487022, 42.3663935],
  [-70.9593508, 42.3631253],
  [-70.96725, 42.3570582],
  [-70.9673509, 42.3569817],
  [-70.9687218, 42.3559415],
  [-70.9688208, 42.3558664],
  [-70.9692014, 42.3555767],
  [-70.9739394, 42.3543113],
  [-70.9842565, 42.3622424],
  [-70.9853912, 42.3629359],
  [-70.9866786, 42.3635384],
  [-70.9881592, 42.3639347],
  [-70.9897846, 42.3641788],
  [-70.9994941, 42.3645894],
  [-71.0006951, 42.3646407],
  [-71.0015519, 42.3646765],
  [-71.0103601, 42.3650391],
  [-71.0065179, 42.3751002],
  [-71.0061235, 42.3760523],
  [-71.0004274, 42.3776713],
  [-71.0003025, 42.3777068],
  [-71.0000845, 42.3777688],
  [-70.9960126, 42.3789314],
  [-70.9956145, 42.3790984],
  [-70.9953482, 42.3792617],
  [-70.9951741, 42.3794799],
  [-70.9944232, 42.382368],
  [-70.9943309, 42.3828785],
  [-70.994237, 42.3837629],
  [-70.9941678, 42.384359],
  [-70.994003, 42.3847611],
  [-70.9937918, 42.3850575],
  [-70.9934996, 42.3852456],
  [-70.9927058, 42.3854955],
  [-70.9918254, 42.3857003],
  [-70.9909213, 42.3860485],
  [-70.9902138, 42.3864205],
  [-70.9894214, 42.3866181],
  [-70.988701, 42.3866543],
  [-70.9880721, 42.3865578],
  [-70.9875912, 42.3865173],
  [-70.9870223, 42.3865332],
  [-70.9864624, 42.3866915],
  [-70.986138, 42.3868539],
  [-70.9859383, 42.3870703],
  [-70.9858513, 42.3873314],
  [-70.9858257, 42.3875577],
  [-70.985852, 42.3877969],
  [-70.9860214, 42.3881648],
  [-70.9864195, 42.3885239],
  [-70.9868256, 42.3888883],
  [-70.987038, 42.3891504],
  [-70.9871746, 42.3894096],
  [-70.9872472, 42.3896893],
  [-70.987294, 42.3900911],
  [-70.9872942, 42.3904735],
  [-70.9871807, 42.3909052],
  [-70.9868922, 42.3914715],
  [-70.9868208, 42.3917634],
  [-70.9868362, 42.3920296],
  [-70.9869307, 42.3922527],
  [-70.9870729, 42.3924666],
  [-70.9873346, 42.3926457],
  [-70.9880799, 42.3929612],
  [-70.9888071, 42.3931489],
  [-70.9894537, 42.3932581],
  [-70.9899938, 42.3932669],
  [-70.9905262, 42.3932111],
  [-70.9910855, 42.3931036],
  [-70.9921104, 42.3928543],
  [-70.9925473, 42.3927756],
  [-70.9929985, 42.392785],
  [-70.9935482, 42.3928668],
  [-70.9942613, 42.3932965],
  [-70.9945795, 42.3933288],
  [-70.9949308, 42.3934975],
  [-70.9952363, 42.3936772],
  [-70.9954622, 42.3939303],
  [-70.9955645, 42.3942734],
  [-70.9964758, 42.396308],
  [-70.9976701, 42.3967414],
  [-70.9983063, 42.3969294],
  [-70.9987682, 42.3969736],
  [-70.9991458, 42.3969775],
  [-70.9994946, 42.3969396],
  [-71.0014072, 42.3967403],
  [-71.0053852, 42.3940881],
  [-71.0056004, 42.3939619],
  [-71.0058618, 42.3938921],
  [-71.0089454, 42.3951921],
  [-71.0098946, 42.3954753],
  [-71.0119545, 42.3957677],
  [-71.0154871, 42.3966656],
  [-71.0161829, 42.3950892],
  [-71.0166228, 42.3939404],
  [-71.0168186, 42.3918961],
  [-71.0174068, 42.3909897],
  [-71.018342, 42.389754],
  [-71.0191139, 42.3888053],
  [-71.0206498, 42.3874332],
  [-71.0211318, 42.3871095],
  [-71.0215027, 42.3868553],
  [-71.0222236, 42.3863498],
  [-71.0228379, 42.3861012],
  [-71.0233558, 42.3858042],
  [-71.0238953, 42.3855577],
  [-71.025694, 42.3847121],
  [-71.0267478, 42.3842461],
  [-71.0273463, 42.3841343],
  [-71.0279746, 42.3840827],
  [-71.029128, 42.3841186],
  [-71.0297749, 42.3841607],
  [-71.0304473, 42.3842867],
  [-71.0342536, 42.3853025],
  [-71.0353725, 42.3855906],
  [-71.0361297, 42.3857428],
  [-71.0366384, 42.3858326],
  [-71.0374175, 42.38591],
  [-71.0382894, 42.3859585],
  [-71.0398234, 42.3859478],
  [-71.0402157, 42.3858723],
  [-71.0403539, 42.3858149],
  [-71.0408925, 42.385561],
  [-71.0413764, 42.3852513],
  [-71.0418369, 42.3849808],
  [-71.0424438, 42.3846073],
  [-71.0429976, 42.3843658],
  [-71.0435356, 42.3841924],
  [-71.0441362, 42.3840929],
  [-71.0445686, 42.3840806],
  [-71.0448466, 42.384165],
  [-71.0452021, 42.3843239],
  [-71.0460609, 42.3847842],
  [-71.0465637, 42.385045],
  [-71.0469843, 42.3853498],
  [-71.0472599, 42.3853916],
  [-71.0550185, 42.3869889],
  [-71.0550651, 42.3869953],
  [-71.0561755, 42.3871504],
  [-71.0579639, 42.3871905],
  [-71.0589811, 42.3872382],
  [-71.0599365, 42.3872469],
  [-71.0608299, 42.3872037],
  [-71.0617376, 42.3870924],
  [-71.0629537, 42.386877],
  [-71.0642699, 42.3866265],
  [-71.06474, 42.3865506],
  [-71.0652635, 42.3865199],
  [-71.0657573, 42.386524],
  [-71.0661893, 42.3865916],
  [-71.0665672, 42.3866757],
  [-71.0701412, 42.3884863],
  [-71.0708773, 42.3890382],
  [-71.0706328, 42.3896196],
  [-71.0705849, 42.3896926],
  [-71.0705165, 42.3897841],
  [-71.0704913, 42.3898364],
  [-71.0704824, 42.3898515],
  [-71.0702957, 42.390041],
  [-71.0701308, 42.3902904],
  [-71.0690624, 42.391762],
  [-71.069121, 42.391779],
  [-71.0690126, 42.3918845],
  [-71.0674098, 42.3934763],
  [-71.0669709, 42.3942457],
  [-71.0670292, 42.3945318],
  [-71.0668597, 42.3949762],
  [-71.0673653, 42.3953012],
  [-71.068857, 42.3940373],
  [-71.0690373, 42.3938845],
  [-71.0701991, 42.3936074],
  [-71.0707444, 42.3933028],
  [-71.071227, 42.3928269],
  [-71.0725698, 42.3907871],
  [-71.073342, 42.3918968],
  [-71.074182, 42.3906817],
  [-71.0742533, 42.390579],
  [-71.0742633, 42.3905649],
  [-71.0754932, 42.3888513],
  [-71.0797128, 42.3829206],
  [-71.0804758, 42.3825787],
  [-71.0808124, 42.3824207],
  [-71.0809711, 42.3823233],
  [-71.0807016, 42.38104],
  [-71.0756572, 42.3801956],
  [-71.0729323, 42.3738397],
  [-71.0726884, 42.3732218],
  [-71.0724658, 42.3726583],
  [-71.0671152, 42.3718157],
  [-71.0645738, 42.3694749],
  [-71.0639844, 42.368932],
  [-71.0675769, 42.3690069],
  [-71.069478, 42.3690461],
  [-71.0699797, 42.3685742],
  [-71.0705516, 42.3680367],
  [-71.0712616, 42.3673421],
  [-71.0737215, 42.3650567],
  [-71.074793, 42.3637733],
  [-71.074941, 42.3635083],
  [-71.0750956, 42.3632033],
  [-71.0756831, 42.3615429],
  [-71.0760926, 42.3603804],
  [-71.0764275, 42.3599247],
  [-71.0768096, 42.3595044],
  [-71.0773337, 42.3590844],
  [-71.0779522, 42.3587351],
  [-71.0910021, 42.3543965],
  [-71.0911994, 42.354347],
  [-71.0932162, 42.3538661],
  [-71.0936904, 42.3537776],
  [-71.0972447, 42.3531916],
  [-71.1023987, 42.3526234],
  [-71.1034068, 42.352449],
  [-71.1043179, 42.3524025],
  [-71.1060085, 42.3524739],
  [-71.107472, 42.3525035],
  [-71.1092183, 42.3525465],
  [-71.1100832, 42.3525494],
  [-71.1106292, 42.3526219],
  [-71.1115126, 42.3527393],
  [-71.1124598, 42.352903],
  [-71.113207, 42.3531152],
  [-71.1140866, 42.3534513],
  [-71.1149159, 42.3538612],
  [-71.1159099, 42.3545308],
  [-71.1165224, 42.3550264],
  [-71.1168527, 42.3553853],
  [-71.1170662, 42.3558672],
  [-71.117113, 42.3563732],
  [-71.1171656, 42.3569978],
  [-71.1170727, 42.3575452],
  [-71.116734, 42.3585311],
  [-71.116649, 42.3588393],
  [-71.116597, 42.3591846],
  [-71.116578, 42.359567],
  [-71.1166082, 42.3600853],
  [-71.1167013, 42.3611837],
  [-71.1167069, 42.3612464],
  [-71.1168415, 42.3627511],
  [-71.1169358, 42.3636769],
  [-71.1169208, 42.3642452],
  [-71.1168927, 42.3653053],
  [-71.1168725, 42.3658851],
  [-71.1169677, 42.3666505],
  [-71.1170818, 42.3670333],
  [-71.1172296, 42.3673669],
  [-71.1175359, 42.3678666],
  [-71.1176915, 42.3681459],
  [-71.1179342, 42.3683849],
  [-71.1181904, 42.3685286],
  [-71.1185237, 42.3686441],
  [-71.1189598, 42.3687598],
  [-71.1195502, 42.3688381],
  [-71.1200901, 42.3688208],
  [-71.1207584, 42.3687849],
  [-71.121594, 42.3687114],
  [-71.1220438, 42.3687033],
  [-71.1224803, 42.3687619],
  [-71.1230767, 42.3689035],
  [-71.123357, 42.3689931],
  [-71.1235064, 42.3690416],
  [-71.123827, 42.369157],
  [-71.1241728, 42.3693296],
  [-71.1244544, 42.3695116],
  [-71.1246331, 42.3697217],
  [-71.1247678, 42.369919],
  [-71.1253666, 42.3709474],
  [-71.1255217, 42.3712041],
  [-71.125688, 42.3714649],
  [-71.1258551, 42.371709],
  [-71.1259963, 42.3718992],
  [-71.1261253, 42.3720602],
  [-71.1262617, 42.3722143],
  [-71.1264134, 42.3723664],
  [-71.1265773, 42.3725177],
  [-71.1267864, 42.3726841],
  [-71.1270466, 42.3728748],
  [-71.1273246, 42.3730678],
  [-71.1276131, 42.373256],
  [-71.127852, 42.3733978],
  [-71.1280892, 42.3735285],
  [-71.1283146, 42.3736448],
  [-71.1285049, 42.3737226],
  [-71.1286742, 42.3737814],
  [-71.128859, 42.3738365],
  [-71.1290567, 42.3738793],
  [-71.1292924, 42.3739167],
  [-71.1295373, 42.3739438],
  [-71.129816, 42.373962],
  [-71.1300809, 42.3739728],
  [-71.1303381, 42.3739748],
  [-71.1305798, 42.3739667],
  [-71.1308214, 42.3739436],
  [-71.1310439, 42.3739134],
  [-71.1312743, 42.3738715],
  [-71.1314936, 42.3738189],
  [-71.1316991, 42.373753],
  [-71.1319005, 42.373679],
  [-71.1321125, 42.3735863],
  [-71.132306, 42.3734806],
  [-71.1324679, 42.3733798],
  [-71.1325959, 42.3732868],
  [-71.1327163, 42.3731922],
  [-71.1328257, 42.3730808],
  [-71.1329573, 42.3729313],
  [-71.1330479, 42.3728161],
  [-71.1331186, 42.372712],
  [-71.1331633, 42.3726027],
  [-71.1331914, 42.3724952],
  [-71.1332016, 42.3723825],
  [-71.1331971, 42.3722696],
  [-71.1331768, 42.3721593],
  [-71.1331315, 42.3720459],
  [-71.1330722, 42.3719387],
  [-71.1329991, 42.3718359],
  [-71.1326134, 42.3714054],
  [-71.1324532, 42.3712312],
  [-71.1323094, 42.3710636],
  [-71.1321777, 42.3708969],
  [-71.1320644, 42.3707231],
  [-71.1319608, 42.3705395],
  [-71.1318861, 42.3703645],
  [-71.1318171, 42.3701631],
  [-71.1317779, 42.3699972],
  [-71.131764, 42.3698494],
  [-71.1317784, 42.3697161],
  [-71.1318349, 42.3695715],
  [-71.1319118, 42.369439],
  [-71.1320182, 42.3692881],
  [-71.1321737, 42.3691115],
  [-71.132361, 42.3689319],
  [-71.1325663, 42.3687543],
  [-71.1328925, 42.3685128],
  [-71.1332409, 42.3682813],
  [-71.1334963, 42.3681283],
  [-71.1337713, 42.3679765],
  [-71.1340575, 42.3678391],
  [-71.1343409, 42.3677224],
  [-71.1346579, 42.3676161],
  [-71.1353271, 42.3674126],
  [-71.1356079, 42.3673222],
  [-71.1359062, 42.3672053],
  [-71.1361801, 42.367069],
  [-71.1364276, 42.3669247],
  [-71.1366451, 42.3667787],
  [-71.1368713, 42.3666164],
  [-71.1370652, 42.3664533],
  [-71.1382856, 42.3653585],
  [-71.1387542, 42.3650008],
  [-71.1390412, 42.3648068],
  [-71.1393005, 42.3646629],
  [-71.1395594, 42.3645523],
  [-71.139797, 42.3644784],
  [-71.1399909, 42.3644392],
  [-71.1401647, 42.3644231],
  [-71.1403772, 42.3644162],
  [-71.1405896, 42.3644336],
  [-71.1407811, 42.3644681],
  [-71.1409716, 42.364518],
  [-71.1424674, 42.364942],
  [-71.1427225, 42.365003],
  [-71.1429391, 42.365044],
  [-71.1431283, 42.3650688],
  [-71.1432911, 42.3650816],
  [-71.1434718, 42.3650817],
  [-71.1436674, 42.3650808],
  [-71.1438184, 42.3650517],
  [-71.1439864, 42.3650288],
  [-71.1441413, 42.3649954],
  [-71.1442983, 42.364937],
  [-71.1444367, 42.3648647],
  [-71.1445629, 42.364775],
  [-71.1447325, 42.3646481],
  [-71.1449314, 42.3644817],
  [-71.1451039, 42.3643103],
  [-71.1452405, 42.36415],
  [-71.1453947, 42.363944],
  [-71.1455346, 42.3637136],
  [-71.145643, 42.3634882],
  [-71.1457436, 42.3632669],
  [-71.1458621, 42.363055],
  [-71.1460062, 42.3628576],
  [-71.1461703, 42.3626727],
  [-71.1463278, 42.3625165],
  [-71.1473544, 42.3616023],
  [-71.1475208, 42.3614722],
  [-71.1476279, 42.3614064],
  [-71.1477358, 42.3613487],
  [-71.1478872, 42.3612806],
  [-71.1480836, 42.3612052],
  [-71.1482984, 42.3611452],
  [-71.1485033, 42.3611005],
  [-71.1487125, 42.3610614],
  [-71.1519344, 42.3607901],
  [-71.1521852, 42.3607495],
  [-71.1524228, 42.3606965],
  [-71.1526487, 42.360625],
  [-71.1537012, 42.3602246],
  [-71.1540008, 42.3601281],
  [-71.1543079, 42.3600415],
  [-71.154637, 42.3599793],
  [-71.1549688, 42.3599317],
  [-71.1553086, 42.3598956],
  [-71.1556259, 42.359875],
  [-71.1559784, 42.3598728],
  [-71.1563155, 42.3598883],
  [-71.1566752, 42.3599147],
  [-71.1572098, 42.3599626],
  [-71.1576714, 42.3599935],
  [-71.1580509, 42.3600096],
  [-71.1584353, 42.3600048],
  [-71.1588017, 42.3599664],
  [-71.1591667, 42.3599172],
  [-71.159498, 42.3598479],
  [-71.1598297, 42.3597539],
  [-71.160169, 42.3596374],
  [-71.1605121, 42.3595018],
  [-71.1608061, 42.3593754],
  [-71.1610936, 42.3592356],
  [-71.1612776, 42.3591437],
  [-71.1614388, 42.3590444],
  [-71.1615981, 42.3589286],
  [-71.1617408, 42.3588159],
  [-71.1618977, 42.3587277],
  [-71.1620662, 42.3586678],
  [-71.162259, 42.358614],
  [-71.1624468, 42.3585813],
  [-71.1626673, 42.3585592],
  [-71.1630055, 42.3585408],
  [-71.1632809, 42.3585322],
  [-71.1635658, 42.3585455],
  [-71.1638515, 42.3585838],
  [-71.1641122, 42.3586486],
  [-71.1643412, 42.3587403],
  [-71.1645534, 42.3588702],
  [-71.1655941, 42.3596421],
  [-71.165821, 42.3597951],
  [-71.1660809, 42.3599164],
  [-71.1663505, 42.3600009],
  [-71.1666219, 42.3600488],
  [-71.1669414, 42.3600695],
  [-71.1675087, 42.3600832],
  [-71.168434, 42.3591459],
  [-71.1686246, 42.3589563],
  [-71.171066, 42.3564228],
  [-71.1739162, 42.353465],
  [-71.1748495, 42.3503373],
  [-71.1666834, 42.3401041],
  [-71.1668084, 42.3392902],
  [-71.1679734, 42.3388662],
  [-71.1684111, 42.3387069],
  [-71.1686334, 42.3386291],
  [-71.1689362, 42.3384486],
  [-71.1692168, 42.338068],
  [-71.1691224, 42.3373764],
  [-71.1688585, 42.3363042],
  [-71.1688864, 42.3358264],
  [-71.1685697, 42.3351432],
  [-71.1684714, 42.3350855],
  [-71.1681892, 42.3347904],
  [-71.1675281, 42.3333599],
  [-71.1653029, 42.3336257],
  [-71.163056, 42.3338516],
  [-71.1627127, 42.3338843],
  [-71.1624422, 42.3338917],
  [-71.1619898, 42.3338536],
  [-71.1614053, 42.3337248],
  [-71.1608338, 42.3334875],
  [-71.1600755, 42.3331154],
  [-71.1596325, 42.332876],
  [-71.159181, 42.332496],
  [-71.1586644, 42.3319876],
  [-71.1572165, 42.3305669],
  [-71.1570367, 42.3303905],
  [-71.149853, 42.3346346],
  [-71.1504614, 42.334968],
  [-71.1501336, 42.3352096],
  [-71.1500586, 42.3353929],
  [-71.1482946, 42.3358067],
  [-71.1487419, 42.336865],
  [-71.1473224, 42.3371872],
  [-71.146156, 42.3374418],
  [-71.1463421, 42.3380363],
  [-71.1464894, 42.3381613],
  [-71.1466057, 42.3385371],
  [-71.1462448, 42.3385946],
  [-71.1461616, 42.3386975],
  [-71.1452754, 42.3393362],
  [-71.1442115, 42.3400223],
  [-71.1423948, 42.340061],
  [-71.1419393, 42.3400083],
  [-71.141879, 42.3402289],
  [-71.1418538, 42.3403012],
  [-71.1417807, 42.3404699],
  [-71.141744, 42.3405388],
  [-71.1417031, 42.3406067],
  [-71.1416593, 42.340673],
  [-71.1416357, 42.3407064],
  [-71.1416106, 42.3407396],
  [-71.1415497, 42.3408163],
  [-71.1415234, 42.340846],
  [-71.1414868, 42.340887],
  [-71.1414261, 42.3409496],
  [-71.1413507, 42.3410168],
  [-71.140778, 42.3415355],
  [-71.1400698, 42.3420887],
  [-71.1399059, 42.3421998],
  [-71.135987, 42.345368],
  [-71.135278, 42.3459411],
  [-71.1351494, 42.3460211],
  [-71.1333807, 42.3471217],
  [-71.1298545, 42.3487958],
  [-71.1295706, 42.3489301],
  [-71.1291337, 42.3491358],
  [-71.1290702, 42.3491693],
  [-71.1289837, 42.3492221],
  [-71.1288909, 42.3492921],
  [-71.1288027, 42.3493749],
  [-71.1287279, 42.3494628],
  [-71.1286684, 42.3495555],
  [-71.1286226, 42.3496523],
  [-71.1285941, 42.3497407],
  [-71.1285835, 42.3498327],
  [-71.1279004, 42.3498728],
  [-71.1277571, 42.3498862],
  [-71.1276168, 42.3499048],
  [-71.1274652, 42.3499275],
  [-71.1272084, 42.3499768],
  [-71.1270785, 42.3500055],
  [-71.1269495, 42.3500369],
  [-71.1268026, 42.3500782],
  [-71.1267043, 42.3501085],
  [-71.12659, 42.3501459],
  [-71.1265085, 42.3501745],
  [-71.1264147, 42.3502101],
  [-71.1263017, 42.350255],
  [-71.1262257, 42.3502879],
  [-71.1260638, 42.3503618],
  [-71.1259629, 42.3504125],
  [-71.1258909, 42.3504509],
  [-71.1258549, 42.35047],
  [-71.1258193, 42.3504904],
  [-71.1249624, 42.3510084],
  [-71.1245722, 42.3512409],
  [-71.1241357, 42.3515442],
  [-71.1241202, 42.3515493],
  [-71.1241033, 42.3515524],
  [-71.1240857, 42.3515535],
  [-71.1240671, 42.3515523],
  [-71.1229422, 42.3514162],
  [-71.1228727, 42.3517551],
  [-71.1109784, 42.3503237],
  [-71.1065504, 42.3497909],
  [-71.1071421, 42.3470463],
  [-71.10567, 42.344121],
  [-71.1055164, 42.3438124],
  [-71.1058604, 42.343692],
  [-71.1060718, 42.3435828],
  [-71.1061738, 42.3434906],
  [-71.1062209, 42.3434329],
  [-71.106229, 42.3433693],
  [-71.106245, 42.343323],
  [-71.1063, 42.3432595],
  [-71.1065143, 42.3431064],
  [-71.1065817, 42.3430721],
  [-71.1066608, 42.3430354],
  [-71.1069082, 42.3429544],
  [-71.1071414, 42.3428593],
  [-71.1074422, 42.3426877],
  [-71.1078879, 42.3425512],
  [-71.1080279, 42.3424787],
  [-71.1081163, 42.3424061],
  [-71.1081943, 42.3423297],
  [-71.1082256, 42.3422722],
  [-71.1082261, 42.3421879],
  [-71.1082266, 42.342108],
  [-71.1082396, 42.3420585],
  [-71.1082687, 42.3420038],
  [-71.1083174, 42.3419555],
  [-71.1084455, 42.341851],
  [-71.1087718, 42.3417486],
  [-71.1090411, 42.3416651],
  [-71.109357, 42.3415819],
  [-71.1095538, 42.341494],
  [-71.1096009, 42.3414599],
  [-71.1096594, 42.3414013],
  [-71.1097677, 42.3412227],
  [-71.1098508, 42.3411693],
  [-71.1099857, 42.3411084],
  [-71.1100895, 42.341032],
  [-71.1101777, 42.3409594],
  [-71.1103602, 42.3407338],
  [-71.1104697, 42.3405922],
  [-71.1105791, 42.340443],
  [-71.1106629, 42.3402706],
  [-71.1107129, 42.3401246],
  [-71.110721, 42.3400829],
  [-71.1107067, 42.3400326],
  [-71.1106801, 42.3399906],
  [-71.1106755, 42.3398986],
  [-71.1107646, 42.3397186],
  [-71.1108434, 42.3395041],
  [-71.1108854, 42.3388842],
  [-71.1109363, 42.338745],
  [-71.11103, 42.338565],
  [-71.111114, 42.3383659],
  [-71.1113134, 42.3379024],
  [-71.111403, 42.3376304],
  [-71.1114656, 42.3375346],
  [-71.1115333, 42.3374582],
  [-71.1115596, 42.3373815],
  [-71.1115599, 42.3373317],
  [-71.1115343, 42.3372856],
  [-71.111416, 42.3371854],
  [-71.1112926, 42.337089],
  [-71.1112208, 42.3369891],
  [-71.1112008, 42.3369063],
  [-71.1111704, 42.3367704],
  [-71.1111535, 42.3367169],
  [-71.1111142, 42.3366628],
  [-71.1110578, 42.3366293],
  [-71.1109081, 42.336547],
  [-71.1108002, 42.3364316],
  [-71.110708, 42.3363086],
  [-71.1107002, 42.3362623],
  [-71.1107137, 42.3362126],
  [-71.1107369, 42.3361638],
  [-71.1107972, 42.3360863],
  [-71.1109011, 42.3360138],
  [-71.1109791, 42.3359451],
  [-71.1110003, 42.3358338],
  [-71.1109905, 42.3357571],
  [-71.110929, 42.3356725],
  [-71.1107334, 42.3355337],
  [-71.1105529, 42.3354641],
  [-71.110517, 42.3354027],
  [-71.110533, 42.3353298],
  [-71.1105915, 42.3352494],
  [-71.1109692, 42.3348744],
  [-71.1111157, 42.3347335],
  [-71.1113388, 42.3346],
  [-71.1115677, 42.3343744],
  [-71.1117654, 42.3341679],
  [-71.1119575, 42.3340267],
  [-71.1120533, 42.3339017],
  [-71.1121915, 42.3338011],
  [-71.1123898, 42.3335295],
  [-71.1126583, 42.3330755],
  [-71.1128333, 42.3328484],
  [-71.1129686, 42.3326952],
  [-71.113088, 42.3326036],
  [-71.1131661, 42.3325157],
  [-71.1132235, 42.3324353],
  [-71.1132548, 42.332397],
  [-71.1132654, 42.3323472],
  [-71.1132348, 42.3322896],
  [-71.1132329, 42.3322359],
  [-71.1132713, 42.3322168],
  [-71.1132974, 42.3321748],
  [-71.1132928, 42.3320942],
  [-71.1135587, 42.3305038],
  [-71.1140344, 42.3294776],
  [-71.1150401, 42.3273082],
  [-71.115272, 42.326935],
  [-71.1153465, 42.3268756],
  [-71.1154456, 42.3268255],
  [-71.115563, 42.3267802],
  [-71.1156808, 42.3267119],
  [-71.1157614, 42.3266276],
  [-71.1158113, 42.3265612],
  [-71.1159648, 42.3263794],
  [-71.1160147, 42.326246],
  [-71.116023, 42.3261349],
  [-71.1159452, 42.3259544],
  [-71.115948, 42.3257349],
  [-71.1161339, 42.3252706],
  [-71.1162085, 42.3252021],
  [-71.116246, 42.3251106],
  [-71.1162717, 42.324946],
  [-71.1163529, 42.3247904],
  [-71.1163473, 42.3246942],
  [-71.1163293, 42.3245979],
  [-71.116404, 42.324502],
  [-71.116362, 42.3243095],
  [-71.1164248, 42.3241173],
  [-71.116537, 42.323939],
  [-71.1166735, 42.323825],
  [-71.1167727, 42.3237703],
  [-71.1171249, 42.3236845],
  [-71.1174525, 42.3236169],
  [-71.1177862, 42.3235539],
  [-71.1180085, 42.3235363],
  [-71.1181693, 42.3235002],
  [-71.1182803, 42.3234914],
  [-71.1183979, 42.3234551],
  [-71.1184786, 42.3233821],
  [-71.1184791, 42.3232996],
  [-71.1185092, 42.3231158],
  [-71.1188702, 42.3228575],
  [-71.1194369, 42.3227354],
  [-71.1200703, 42.3228049],
  [-71.1215287, 42.3238828],
  [-71.1233676, 42.3225719],
  [-71.123712, 42.3227163],
  [-71.1242759, 42.3218498],
  [-71.1271404, 42.318652],
  [-71.1287293, 42.3168106],
  [-71.1306072, 42.3145637],
  [-71.1318627, 42.3131777],
  [-71.1327961, 42.3117751],
  [-71.1344517, 42.309106],
  [-71.1365017, 42.3062036],
  [-71.1369939, 42.3056518],
  [-71.1401857, 42.302111],
  [-71.1468826, 42.2972797],
  [-71.1503606, 42.2954992],
  [-71.1521134, 42.2945881],
  [-71.1646996, 42.3038383],
  [-71.1786116, 42.2946181],
  [-71.1912442, 42.2829427],
].map((e) => [...e].reverse());

function ChangeView({
  center,
  bound,
}: {
  center: LatLngExpression;
  bound: LatLngBoundsExpression;
}) {
  const map = useMap();

  map.setView(center, 1);
  map.fitBounds(bound, {
    padding: [10, 10],
  });
  return null;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ selectedLocation }: { selectedLocation: any }) => {
  var latCoordinate = 42.3554334;
  var lngCoordinate = -71.060511;

  if (selectedLocation) {
    latCoordinate = selectedLocation.lat;
    // eslint-disable-next-line no-lone-blocks
    {
      /* 
        ----Alternate calculation using boundingbox key/parameter----   
            latCoordinate = Math.sign(selectedLocation.boundingbox[0]) *
                ((Math.abs(selectedLocation.boundingbox[0]) + Math.abs(selectedLocation.boundingbox[1])) / 2);
    */
    }
    lngCoordinate = selectedLocation.lon;
    // eslint-disable-next-line no-lone-blocks
    {
      /* 
        ----Alternate calculation using boundingbox key/parameter---- 
            lngCoordinate = Math.sign(selectedLocation.boundingbox[2]) *
                ((Math.abs(selectedLocation.boundingbox[2]) + Math.abs(selectedLocation.boundingbox[3])) / 2);
    */
    }
  }

  var position: LatLngExpression = [latCoordinate, lngCoordinate];

  return (
    <MapContainer
      center={position}
      zoom={12}
      scrollWheelZoom={true}
      style={{ zIndex: 0 }}
      touchZoom={true}
    >
      <ChangeView
        center={position}
        bound={
          selectedLocation
            ? [
                ...selectedLocation.geojson.coordinates[0].map((c: any) =>
                  [...c].reverse()
                ),
              ]
            : defaultCoordinates
        }
      />

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {selectedLocation && (
        <Polygon
          positions={selectedLocation.geojson.coordinates[0].map(
            (x: string[]) => [...x].reverse()
          )}
        >
          <Popup>
            <div className="p-2 px-3">
              <b className="m-0 p-0">{selectedLocation.display_name}</b>
              <p className="m-0 p-0">
                Population: {selectedLocation.population}
              </p>
              <p className="m-0 p-0">
                Population Recorded Date: {selectedLocation.population_date}
              </p>
            </div>
          </Popup>
        </Polygon>
      )}
      {/* <Marker position={[42.3554334, -71.060511]}>
     
    </Marker> */}
    </MapContainer>
  );
};
