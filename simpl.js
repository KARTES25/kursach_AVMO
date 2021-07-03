document.addEventListener("DOMContentLoaded", main);
let m =3, n = 6;
function main(){
    
    let Matri = new Array(m);
    Matri = [
    [5, 1, -1, 0, 0, 12],
    [5, 4, 0, -1, 0, 33],
    [2, 5, 0, 0, -1, 20]
    ];

    let Z = [2, 1, 0, 0, 0, 0];

    str = 'min';
    baz = [1,2,5];
    //baz = [1,3, 5, 6];

    document.body.appendChild(document.createElement("hr"));
    document.body.appendChild(document.createTextNode('Изначальная матрица'))
    print(Matri);

    document.body.appendChild(document.createTextNode('Z(x) ='))
    for(i = 0; i < n; i++)
    document.body.appendChild(document.createTextNode(Z[i] + ' '))
    document.body.appendChild(document.createTextNode(str))
    document.body.appendChild(document.createElement("br"));

    document.body.appendChild(document.createTextNode('Базис '))
    for(i = 0; i < m; i++)
    document.body.appendChild(document.createTextNode('x' + baz[i] + ' '))
    
    let Znew = [];
    let Matri2 = [];
    for(i = 0; i < m; i++){
        Matri2[i] = new Array(n);
        Znew[i] = new Array(n);
    }

    document.body.appendChild(document.createElement("hr"));
    document.body.appendChild(document.createTextNode('Метод Жардана-Гаусса относительно базисных переменных'))
    for(ind = 0, sw = 0; ind < baz.length; ind++, sw++){
        for(i2 = sw+1; i2 < m; i2++){
            if(Matri[ind][(baz[ind] - 1)] == 0){
                SwapRows(Matri, sw, i2)
            }
        }
        for(i = 0; i < m; i++){
            for (j = 0; j < n; j++) {
                Matri2[i][j] = Matri[i][j];
            } 
        }
        Matri = jard(ind, (baz[ind] - 1), Matri, Matri2);
        print(Matri);
    }
    
    document.body.appendChild(document.createTextNode('Подстановка базисных переменных в целевую функцию'))
    document.body.appendChild(document.createElement("hr"));
    let zn = creatZ(Z, Znew,Matri,baz);
    print(Znew);
    document.body.appendChild(document.createTextNode('Z = '))
    for(i = 0; i < n; i++){
        if (Number.isInteger(zn[i])){
            document.body.appendChild(document.createTextNode('(' + zn[i] + ') '));
        }else{
            let dr = math.fraction(zn[i]);
            let dr2;
            if (dr.s > 0){
                dr2 = dr.n + "/" + dr.d;
            }else{
                dr2 ="-" + dr.n + "/" + dr.d;  
            }
            document.body.appendChild(document.createTextNode('(' + dr2 + ') '));
        }
    }

    let baz2 = [];
    for(i = 0; i <= m; i++){
        baz2[i] = baz[i]
    }
    simplex(Z, zn, Matri, str, baz, baz2);
}

function jard(strok, stolb, arr, arr2){
    razr = arr[strok][stolb];
    for(i = 0; i < arr.length ; i++){
        for(j = 0; j < n ; j++){
            if(i == strok){
                arr[i][j] /= razr 
            }else{
                if (j == stolb){
                    arr[i][j] = 0;
                }else{
                    arr[i][j] = (razr * arr[i][j] - arr2[strok][j] * arr2[i][stolb]) / razr;
                }
            }
        }     
    }
    return arr
}

function SwapRows(arr,iter_item, swap) {
    for(j = 0; j < n; j++) {
        t = arr[swap][j];
        arr[swap][j] = arr[iter_item][j];
        ///console.log(arr[swap][j] + " меняем местами" + arr[iter_item][j])
        arr[iter_item][j] = t;
    }

}

function print(arr){
    document.body.appendChild(document.createElement("hr"));
    for(i = 0; i < m; i++){
        for (j = 0; j < n; j++) {
            if (Number.isInteger(arr[i][j])){
                document.body.appendChild(document.createTextNode(arr[i][j] + ' '));
            }else{
                let dr = math.fraction(arr[i][j]);
                let dr2;
                if (dr.s > 0){
                    dr2 = dr.n + "/" + dr.d;
                }else{
                    dr2 ="-" + dr.n + "/" + dr.d;  
                }
                document.body.appendChild(document.createTextNode(dr2 + ' '));
            }
        } 
        document.body.appendChild(document.createElement("br"));
    }
    document.body.appendChild(document.createElement("hr"));
}

function print2(arr,baz){
    document.body.appendChild(document.createElement("hr"));
    for(i = 0; i <= n; i++){
        ta = document.createElement("input");
        if (i == 0){
            ta.value = "BAZIS";
        }else if(i == n){
            ta.value = "I";
        }else
        ta.value = "x" + i;
        document.body.appendChild(ta);
    }
    document.body.appendChild(document.createElement("br"));
    for(i = 0; i <= m; i++){
        ta = document.createElement("input");
        if (i == m){
            ta.value = "Z";
        }else
        ta.value = 'x' +baz[i];
        document.body.appendChild(ta);
        for (j = 0; j < n; j++) {
            if (Number.isInteger(arr[i][j])){
                ta = document.createElement("input");
                ta.value = arr[i][j];
                document.body.appendChild(ta);
            }else{
                let dr = math.fraction(arr[i][j]);
                let dr2;
                if (dr.s > 0){
                    dr2 = dr.n + "/" + dr.d;
                }else{
                    dr2 ="-" + dr.n + "/" + dr.d;  
                }
                ta = document.createElement("input");
                ta.value = dr2;
                document.body.appendChild(ta);
                //document.body.appendChild(document.createTextNode(dr2 + ' '));
            }
        } 
        document.body.appendChild(document.createElement("br"));
    }
    document.body.appendChild(document.createElement("hr"));
}

function creatZ(z1, z2, arr, baz){
    for(i = 0; i < m ; i++){
        let i2 =0;
        for(j = 0; j < n -1  ; j++){
            if (j == (baz[i2] - 1)){
                i2++;
                z2[i][j] = 0;
            }else{
                z2[i][j] = -arr[i][j];
            }

        }
        z2[i][n-1] = arr[i][n-1]     
    }
    let z3 = [0,0,0,0,0,0,0,0,0,0,0,0,0,];
    for(i = 0; i < baz.length; i++){
        for(j = 0; j < n; j++){
             z2[i][j] *= z1[baz[i]-1];
            //console.log(z3[j])
        }
    }
    for(j = 0; j < n; j++){
        for(i = 0; i < m; i++){
            z3[j] += z2[i][j];
            //console.log(z3[j])
        }

        // if ((z3[j] == 0) && (z1[j] != 0) && (j != (baz[j] - 1))){
        //     console.log(baz[i] -1 + "s" + j);
        //     z3[j] = z1[j]
        // }
    }
    i3 = 0;
    for(i = 0; i < n; i++){
        if (i != baz[i3] - 1){
            //console.log(baz[i3] - 1)
            //console.log(i)
            z3[i] +=z1[i];
        }else{
            i3++;
        }
    }
    return z3
}

function simplex(Z, z2, arr, str,baz,baz2){
    document.body.appendChild(document.createElement("hr"));
    arr[m] = new Array(n);

    if((baz[0] == 1) && (baz[1] == 2) && (baz[2] == 3)){
        for(j = 0; j < n; j++){
            arr[m][j] = -z2[j];
        }
    }else{
        for(j = 0; j < n; j++){
                arr[m][j] = -z2[j];
        }
    }
    print2(arr, baz2);

    arr[m][n-1] = 0;

    while(1){
        let flag = 0;
        for(i = 0; i < m; i++){
            if (arr[i][n-1] < 0.00000000000000000001){
                flag = 1;
                break;
            }
        }
        if(flag == 1){
            document.body.appendChild(document.createTextNode('Полученный базисный план не является опорным '));
            let mi = 0, strok2;
            for(i = 0; i < m; i++){
                if (arr[i][n-1] < mi){
                    mi = arr[i][n - 1];
                    strok2 = i;
                }
            }
            //console.log(strok2);
            let stolb2;
            for(i = n - 2; i > 0; i--){
                if (arr[strok2][i] < -0.00000000000000000000001){
                    stolb2 = i;
                    break;
                }
            }
            //console.log(stolb2);
            let arr2 = [];
            for(i = 0; i <= m; i++){
                arr2[i] = new Array(n);
                for (j = 0; j < n; j++) {
                    arr2[i][j] = arr[i][j];
                } 
            }
            baz2[strok2] = stolb2 + 1;
            arr = jard(strok2, stolb2, arr, arr2);
            print2(arr, baz2);
        }else{
            break;
        }
    }

    for(oi = 0; oi < 10; oi++){
        let stolb = -1, strok = -1;
        if (str == 'min'){
            let maxi = 0;
            for(i = 0; i < n - 1; i++){
                if (arr[m][i] > maxi) stolb = i;
            }
        }else{
            let mini = 0;
            for(i = 0; i < n - 1; i++){
                if (arr[m][i]  < mini) stolb = i;
            }
        }
        console.log(stolb);
        if (stolb == -1){
            document.body.appendChild(document.createTextNode('Таблица определяет оптимальный план задачи'));
            document.body.appendChild(document.createElement("br"));
            let otv = [];
            for(i = 0; i < n - 1; i++){
                otv[i] = 0;
            }
            for(i = 0; i < m; i++){
                //console.log(baz2[i] - 1)
                otv[baz2[i] - 1] = arr[i][n - 1];
            }
            for(i = 0; i < n - 1; i++){
                if (Number.isInteger(otv[i])){
                    ta = document.createElement("input");
                    ta.value = "x" + (i + 1) + '=' + otv[i];
                    document.body.appendChild(ta);
                }else{
                    let dr = math.fraction(otv[i]);
                    let dr2;
                    if (dr.s > 0){
                        dr2 = dr.n + "/" + dr.d;
                    }else{
                        dr2 ="-" + dr.n + "/" + dr.d;  
                    }
                    ta = document.createElement("input");
                    ta.value = "x" + (i + 1) + '=' + dr;
                    document.body.appendChild(ta);
                }
            }
            document.body.appendChild(document.createElement("br"));
            document.body.appendChild(document.createTextNode('Z(x) = '))
            let otvet = 0;
            for(i = 0; i < n - 1; i++){
                otv[i] *= Z[i];
                otvet += otv[i];
                //console.log(Z[i])
                document.body.appendChild(document.createTextNode(math.fraction(otv[i])))
                if(i != n - 2){
                    document.body.appendChild(document.createTextNode(' + '));
                }else{
                    document.body.appendChild(document.createTextNode(' = ' + math.fraction(otvet)));
                }
            }
            return
        }
        let mao = 999999;
        for(i = 0; i < m; i++){
            if ((arr[i][n-1]/arr[i][stolb] > 0) && (arr[i][n-1]/arr[i][stolb] < mao)){
                strok = i;
                console.log(strok + 'st')
            }
        }
        let Matri2 = [];
        for(i = 0; i <= m; i++){
            Matri2[i] = new Array(n);
            for (j = 0; j < n; j++) {
                Matri2[i][j] = arr[i][j];
            } 
        }
        baz2[strok] = stolb + 1;
        if(strok == -1){
                document.body.appendChild(document.createTextNode('Ответа нет'));
                document.body.appendChild(document.createElement("br"));
            return
        }
        arr = jard(strok, stolb, arr, Matri2);
        print2(arr, baz2);
    }
}